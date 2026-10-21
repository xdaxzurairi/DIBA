"""Stage a minimal repair; installation requires filesystem approval."""
import json
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
WORKSPACE = HERE.parent.parent
GLOBAL = pathlib.Path.home() / '.codex'

original = json.loads((GLOBAL / 'hooks.json').read_text(encoding='utf-8-sig'))
repaired = {'hooks': {}}
actions = {'log-skill.js': 'log-skill', 'capture-signal.js': 'capture-signal', 'git-monitor.js': 'git-monitor', 'session-start.sh': 'session-start'}
for event, groups in original['hooks'].items():
    for group in groups:
        handlers = []
        for handler in group['hooks']:
            action = next((value for key, value in actions.items() if key in handler['command']), None)
            if action:
                handlers.append({'type': 'command', 'command': f'node "{GLOBAL.as_posix()}/hooks/diba-hook.cjs" {action}', 'timeout': 5})
            elif not any(dead in handler['command'] for dead in ('diba-visual-monitoring', '.pixel-agents')):
                handlers.append(handler)
        if handlers:
            repaired['hooks'].setdefault(event, []).append({**group, 'hooks': handlers})
(HERE / 'codex-global-hooks.json').write_text(json.dumps(repaired, indent=2) + '\n', encoding='utf-8')

project = json.loads((WORKSPACE / '.codex/hooks.json').read_text(encoding='utf-8-sig'))
for event, groups in list(project['hooks'].items()):
    kept = []
    for group in groups:
        handlers = []
        for handler in group['hooks']:
            command = handler['command']
            action = command.split(') ELSE')[0].split('"')[-1].strip()
            # Commands below have no handler in the installed Ruflo helper.
            if action in ('pre-edit', 'post-bash', 'compact-manual', 'compact-auto'):
                continue
            if action == 'status':
                action = 'stats'
            if event == 'PreCompact' and action == 'session-end':
                action = 'sync'
            if action not in {'pre-bash', 'post-edit', 'session-restore', 'session-end', 'route', 'stats', 'post-task', 'import', 'sync'}:
                raise ValueError(f'Unrecognized existing hook command: {action!r}')
            handlers.append({'type': 'command', 'command': f'node "{(WORKSPACE / ".codex/hooks/ruflo-hook.cjs").as_posix()}" {action}', 'timeout': 3 if event == 'SessionEnd' else 15})
        if handlers:
            kept.append({**group, 'hooks': handlers})
    if kept:
        project['hooks'][event] = kept
    else:
        del project['hooks'][event]
(HERE / 'codex-project-hooks.json').write_text(json.dumps(project, indent=2) + '\n', encoding='utf-8')
print('Staged global and project hook repairs. Original files unchanged.')
