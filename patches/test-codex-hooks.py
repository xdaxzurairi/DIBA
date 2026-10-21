import json
import os
import pathlib
import shutil
import subprocess
import tempfile
import unittest

HERE = pathlib.Path(__file__).resolve().parent


class HookTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.workspace = pathlib.Path(self.temp.name)
        self.root = self.workspace / 'DIBA'
        (self.root / 'main').mkdir(parents=True)
        self.buffer = self.root / 'main/signal-buffer.md'
        self.buffer.write_text('# signals\n', encoding='utf-8')
        (self.root / 'main/current-session.md').write_text('# Heading\n**Topik:** latest\n**Follow-up terbuka:** test\n\n---\n**Topik:** old', encoding='utf-8')

    def run_hook(self, action, payload, script=None):
        return subprocess.run(['node', str(script or HERE / 'codex-hook.cjs'), action], input=json.dumps(payload),
                              text=True, encoding='utf-8', capture_output=True, timeout=10,
                              env={**os.environ, 'DIBA_HOOK_ROOT': str(self.root)})

    def test_latest_session_context(self):
        result = self.run_hook('session-start', {})
        self.assertEqual(result.returncode, 0, result.stderr)
        context = json.loads(result.stdout)['hookSpecificOutput']['additionalContext']
        self.assertIn('latest', context)
        self.assertNotIn('old', context)

    def test_failures_capture_and_deduplicate_without_output(self):
        payload = {'tool_name': 'Bash', 'tool_response': {'exit_code': 1, 'output': 'secret=do-not-record'}}
        for _ in range(2):
            self.assertEqual(self.run_hook('capture-signal', payload).returncode, 0)
        text = self.buffer.read_text(encoding='utf-8')
        self.assertEqual(text.count('tool-fail'), 1)
        self.assertNotIn('secret', text)

    def test_mcp_error(self):
        self.run_hook('capture-signal', {'tool_name': 'mcp__test', 'tool_response': {'isError': True}})
        self.assertIn('mcp__test', self.buffer.read_text())

    def test_success_containing_error_word_is_not_failure(self):
        self.run_hook('capture-signal', {'tool_name': 'Bash', 'tool_response': {'exit_code': 0, 'content': 'no errors; failed test fixed'}})
        self.assertNotIn('tool-fail', self.buffer.read_text())

    def test_shell_model_text(self):
        self.run_hook('capture-signal', {'tool_name': 'Bash', 'tool_response': 'Process exited with code 2\nOutput: example'})
        self.assertIn('tool-fail', self.buffer.read_text())

    def test_skill_logging(self):
        self.run_hook('log-skill', {'tool_input': {'skill': 'code-sharp'}})
        self.assertEqual(json.loads((self.root / 'main/skill-log.jsonl').read_text())['skill'], 'code-sharp')

    def test_ruflo_installed_paths_and_event_contracts(self):
        hooks = self.workspace / '.codex/hooks'
        hooks.mkdir(parents=True)
        script = hooks / 'ruflo-hook.cjs'
        shutil.copy2(HERE / 'codex-ruflo-hook.cjs', script)
        helpers = self.workspace / '.claude/helpers'
        helpers.mkdir(parents=True)
        stub = "if (process.env.CLAUDE_PROJECT_DIR !== process.cwd()) process.exit(9); if(process.argv[2]==='pre-bash'){console.error('blocked');process.exit(1);}console.log('helper status');"
        (helpers / 'hook-handler.cjs').write_text(stub)
        (helpers / 'auto-memory-hook.mjs').write_text(stub)
        (helpers / 'session.cjs').write_text("if(process.argv[2]!=='end')process.exit(9);console.log('session persisted');")
        result = self.run_hook('route', {'prompt': 'hi diba'}, script)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout), {'hookSpecificOutput': {
            'hookEventName': 'UserPromptSubmit', 'additionalContext': 'helper status\n'
        }})
        (helpers / 'hook-handler.cjs').write_text("console.log('route failed');process.exit(1);")
        result = self.run_hook('route', {}, script)
        self.assertEqual(result.returncode, 1)
        self.assertEqual(result.stdout, '')
        self.assertIn('route failed', result.stderr)
        (helpers / 'hook-handler.cjs').write_text(stub)
        for action in ['post-task', 'sync']:
            result = self.run_hook(action, {}, script)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout), {})
        result = self.run_hook('pre-bash', {}, script)
        self.assertEqual(result.returncode, 2)
        self.assertIn('blocked', result.stderr)
        result = self.run_hook('session-end', {}, script)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('session persisted', result.stdout)

    def test_config_commands_and_timeouts(self):
        for name in ['codex-global-hooks.json', 'codex-project-hooks.json']:
            config = json.loads((HERE / name).read_text())
            for event, groups in config['hooks'].items():
                for group in groups:
                    for handler in group['hooks']:
                        self.assertNotIn('%CLAUDE_PROJECT_DIR%', handler['command'])
                        self.assertNotIn('cmd /c', handler['command'])
                        self.assertLessEqual(handler['timeout'], 15)
                        if event == 'SessionEnd':
                            self.assertLessEqual(handler['timeout'], 3)
                        if event == 'PreCompact':
                            self.assertNotIn('session-end', handler['command'])


if __name__ == '__main__':
    unittest.main()
