#!/usr/bin/env node
/**
 * Scan all SKILL.md files and generate War Room NPC registry.
 * Run: node scripts/scan-skills.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIBA_ROOT = path.resolve(ROOT, '../..');

const SCAN_ROOTS = [
  { base: path.join(DIBA_ROOT, 'Feature'), label: 'feature' },
  { base: path.join(DIBA_ROOT, 'plugins/diba-skills/skills'), label: 'plugin' },
  { base: path.join(process.env.USERPROFILE || process.env.HOME, '.cursor/skills'), label: 'cursor' },
];

const DISTRICTS = {
  spawn: { name: 'Spawn Plaza', color: '#fbbf24', icon: '🌅' },
  memory: { name: 'Memory District', color: '#a78bfa', icon: '🧠' },
  diary: { name: 'Diary District', color: '#f472b6', icon: '📓' },
  project: { name: 'Project District', color: '#60a5fa', icon: '📋' },
  automation: { name: 'Automation District', color: '#facc15', icon: '⚡' },
  command: { name: 'Command District', color: '#34d399', icon: '🎯' },
  wellness: { name: 'Wellness District', color: '#4ade80', icon: '💪' },
  code: { name: 'Code District', color: '#94a3b8', icon: '🔧' },
  persona: { name: 'Persona District', color: '#c084fc', icon: '🎭' },
  creative: { name: 'Creative District', color: '#fb923c', icon: '🎨' },
  workshop: { name: 'Workshop Outpost', color: '#78716c', icon: '🏗️' },
};

const SKILL_DISTRICT = {
  'save-memory': 'memory',
  'session-briefing': 'memory',
  'memory-consolidation': 'memory',
  'diba-recall': 'memory',
  'echo-recall': 'memory',
  'auto-idle-save-recall': 'memory',
  'diba-memory': 'spawn',
  'save-diary': 'diary',
  'log-decision': 'diary',
  'post-mortem': 'diary',
  'observation': 'diary',
  'session-report': 'diary',
  'manage-project': 'project',
  'work-plan': 'project',
  'dream-ideas': 'project',
  'meeting': 'project',
  'resonance': 'project',
  'auto-commit': 'automation',
  'auto-load-hook': 'automation',
  'auto-worker': 'automation',
  'user-prompt-hook': 'automation',
  'auto-learn-new-folder': 'automation',
  'hook-development': 'automation',
  'writing-hookify-rules': 'automation',
  'orchestrate': 'command',
  'diba-operator': 'command',
  'skill-plugin-system': 'command',
  'forge-skill': 'command',
  'anchor': 'command',
  'continuous-improvement': 'command',
  'smart-effort': 'command',
  'skill-creator': 'command',
  'break-reminder': 'wellness',
  'discipline': 'wellness',
  'check-reminders': 'wellness',
  'token-guard': 'wellness',
  'dashboard': 'wellness',
  'code-sharp': 'code',
  'security-audit-remediation': 'code',
  'library': 'code',
  'dev-assistant-skill': 'code',
  'fullstack-uiux-expert': 'code',
  'mood-inject': 'persona',
  'tone-inject': 'persona',
  'time-inject': 'persona',
  'time-aware': 'persona',
  'mulahazah': 'persona',
  'image-prompt': 'creative',
  'interactive-story': 'creative',
  'song-creation': 'creative',
  'diba': 'creative',
  'frontend-pro-architect': 'creative',
  'frontend-design': 'creative',
  'playground': 'creative',
  'diba-welcome': 'spawn',
  'diba-bye': 'spawn',
};

const NPC_TITLES = {
  'save-memory': 'MEMO',
  'session-briefing': 'BRIEF',
  'memory-consolidation': 'MERGE',
  'diba-recall': 'RECALL',
  'echo-recall': 'ECHO',
  'auto-idle-save-recall': 'IDLE',
  'save-diary': 'SCRIBE',
  'log-decision': 'JUDGE',
  'post-mortem': 'PHOENIX',
  'observation': 'WATCH',
  'manage-project': 'LRU',
  'work-plan': 'PLAN',
  'dream-ideas': 'DREAM',
  'meeting': 'GAVEL',
  'resonance': 'SEED',
  'auto-commit': 'COMMIT',
  'auto-load-hook': 'HOOK',
  'auto-worker': 'WORKER',
  'user-prompt-hook': 'PROMPT',
  'auto-learn-new-folder': 'SCOUT',
  'orchestrate': 'MAESTRO',
  'diba-operator': 'DIBA',
  'skill-plugin-system': 'PLUGIN',
  'forge-skill': 'FORGE',
  'anchor': 'ANCHOR',
  'continuous-improvement': 'LEVEL',
  'smart-effort': 'EFFORT',
  'break-reminder': 'REST',
  'discipline': 'DISC',
  'check-reminders': 'BELL',
  'token-guard': 'GUARD',
  'dashboard': 'PANEL',
  'code-sharp': 'SHARP',
  'security-audit-remediation': 'SHIELD',
  'library': 'LIB',
  'image-prompt': 'PIXEL-AI',
  'interactive-story': 'PORTAL',
  'song-creation': 'MELODY',
  'mulahazah': 'MULA',
  'diba-welcome': 'GREETER',
  'diba-bye': 'FAREWELL',
  'diba-memory': 'VAULT',
  'diba': 'UX',
  'dev-assistant-skill': 'DEV',
  'frontend-pro-architect': 'ARCH',
  'frontend-design': 'DESIGN',
  'fullstack-uiux-expert': 'STACK',
  'playground': 'SANDBOX',
  'skill-creator': 'SMITH',
  'session-report': 'REPORT',
  'math-olympiad': 'MATH',
  'build-mcp-server': 'MCP',
  'build-mcpb': 'MCPB',
  'build-mcp-app': 'MCPAPP',
  'agent-development': 'AGENT',
  'm5-onboard': 'M5',
  'cardputer-buddy': 'CARD',
  'claude-md-improver': 'CLAUDE',
  'claude-automation-recommender': 'AUTO',
};

const BOSS_MAP = {
  memory: 'ECHO',
  diary: 'LENS',
  project: 'ORACLE',
  automation: 'GRID',
  command: 'DIBA',
  wellness: 'PULSE',
  code: 'NEXUS',
  persona: 'PIXEL',
  creative: 'PIXEL',
  workshop: 'SAGE',
  spawn: 'DIBA',
};

const FOLDER_DISTRICT = {
  'Save-Memory-System': 'memory',
  'Session-Briefing-System': 'memory',
  'Memory-Consolidation-System': 'memory',
  'DIBA-Recall-System': 'memory',
  'Echo-Memory-Recall': 'memory',
  'auto-idle-save-recall': 'memory',
  'Save-Diary-System': 'diary',
  'Decision-Log-System': 'diary',
  'Post-Mortem-System': 'diary',
  'Observation-System': 'diary',
  'LRU-Project-Management-System': 'project',
  'Work-Plan-Execution': 'project',
  'Dream-Ideas-System': 'project',
  'Meeting-System': 'project',
  'Resonance-System': 'project',
  'Auto-Commit-System': 'automation',
  'Auto-Load-Hook-System': 'automation',
  'Auto-Worker-System': 'automation',
  'User-Prompt-Hook-System': 'automation',
  'auto-learn-new-folder': 'automation',
  'Orchestration-System': 'command',
  'Skill-Plugin-System': 'command',
  'Forge-Self-Improvement-System': 'command',
  'Anchor-System': 'command',
  'Continuous-Improvement-System': 'command',
  'Break-Reminder-System': 'wellness',
  'Discipline-System': 'wellness',
  'Reminders-System': 'wellness',
  'Token-Guard-System': 'wellness',
  'Dashboard-System': 'wellness',
  'Code-Sharp-System': 'code',
  'Security-Audit-System': 'code',
  'Library-System': 'code',
  'Mood-Prompt-Inject-System': 'persona',
  'Tone-Prompt-Inject-System': 'persona',
  'Time-Prompt-Inject-System': 'persona',
  'Time-based-Aware-System': 'persona',
  'Mulahazah-System': 'persona',
  'Image-Prompt-System': 'creative',
  'Interactive-Story-System': 'creative',
  'Song-Creation-System': 'creative',
};

const WORKSHOP_SKILLS = new Set([
  'math-olympiad', 'build-mcp-server', 'build-mcpb', 'build-mcp-app',
  'agent-development', 'mcp-integration', 'plugin-structure', 'plugin-settings',
  'command-development', 'skill-development', 'm5-onboard', 'cardputer-buddy',
  'claude-md-improver', 'claude-automation-recommender',
]);

const STAFF_BOSSES = [
  { id: 'zuex', name: 'ZUEX', title: 'Founder & CEO', district: 'command', role: 'boss', x: 0, y: 0 },
  { id: 'diba-hco', name: 'DIBA', title: 'Head of Chief Operations', district: 'command', role: 'boss', x: 1, y: 0 },
  { id: 'nexus', name: 'NEXUS', title: 'CTO / AI Architect', district: 'code', role: 'boss', x: 0, y: 0 },
  { id: 'forge', name: 'FORGE', title: 'Lead AI Engineer', district: 'command', role: 'boss', x: 2, y: 0 },
  { id: 'lens', name: 'LENS', title: 'Data Scientist', district: 'memory', role: 'boss', x: 0, y: 0 },
  { id: 'oracle', name: 'ORACLE', title: 'Business Strategist', district: 'project', role: 'boss', x: 0, y: 0 },
  { id: 'pixel', name: 'PIXEL', title: 'UI/UX Director', district: 'creative', role: 'boss', x: 0, y: 0 },
  { id: 'echo', name: 'ECHO', title: 'Content & Brand', district: 'memory', role: 'boss', x: 1, y: 0 },
  { id: 'cipher', name: 'CIPHER', title: 'Security Expert', district: 'code', role: 'boss', x: 1, y: 0 },
  { id: 'grid', name: 'GRID', title: 'DevOps Engineer', district: 'automation', role: 'boss', x: 0, y: 0 },
  { id: 'pulse', name: 'PULSE', title: 'QA & Performance', district: 'wellness', role: 'boss', x: 0, y: 0 },
  { id: 'sage', name: 'SAGE', title: 'Research Lead', district: 'workshop', role: 'boss', x: 0, y: 0 },
];

function walkDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walkDir(full, files);
    } else if (entry.name === 'SKILL.md') {
      files.push(full);
    }
  }
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { name: null, description: '' };
  const block = match[1];
  const name = block.match(/^name:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? null;
  const descMatch = block.match(/^description:\s*(?:"([^"]*)"|'([^']*)'|(.+))$/ms);
  let description = '';
  if (descMatch) {
    description = (descMatch[1] || descMatch[2] || descMatch[3] || '').replace(/\s+/g, ' ').trim();
  }
  return { name, description };
}

function extractTriggers(description) {
  const triggers = [];
  const patterns = [
    /Trigger(?:s)?(?:\s+with)?:?\s*([^.\n]+)/i,
    /Trigger:\s*([^.\n]+)/i,
    /"([^"]{2,40})"/g,
  ];
  for (const p of patterns) {
    const m = description.match(p);
    if (m) {
      if (p.global) {
        let g;
        while ((g = p.exec(description)) !== null) triggers.push(g[1]);
      } else {
        m[1].split(/[,;]/).forEach((t) => {
          const clean = t.trim().replace(/^['"]|['"]$/g, '');
          if (clean.length > 1 && clean.length < 50) triggers.push(clean);
        });
      }
    }
  }
  return [...new Set(triggers)].slice(0, 6);
}

function inferDistrict(skillName, filePath, source) {
  if (SKILL_DISTRICT[skillName]) return SKILL_DISTRICT[skillName];
  if (WORKSHOP_SKILLS.has(skillName)) return 'workshop';
  const parts = filePath.split(path.sep);
  for (const part of parts) {
    if (FOLDER_DISTRICT[part]) return FOLDER_DISTRICT[part];
  }
  if (source === 'cursor') return 'workshop';
  return 'command';
}

function npcTitle(skillName) {
  if (NPC_TITLES[skillName]) return NPC_TITLES[skillName];
  return skillName.split(/[-_]/).map((w) => w[0]?.toUpperCase() || '').join('').slice(0, 8) || skillName.toUpperCase().slice(0, 6);
}

function main() {
  const allFiles = [];
  for (const { base, label } of SCAN_ROOTS) {
    for (const f of walkDir(base)) {
      allFiles.push({ path: f, source: label });
    }
  }

  const byName = new Map();
  const priority = { feature: 3, plugin: 2, cursor: 1 };

  for (const { path: filePath, source } of allFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { name, description } = parseFrontmatter(content);
    if (!name || name.includes('[')) continue;

    const existing = byName.get(name);
    if (existing && priority[existing.source] >= priority[source]) continue;

    const district = inferDistrict(name, filePath, source);
    byName.set(name, {
      id: name,
      npcName: npcTitle(name),
      skillName: name,
      title: npcTitle(name),
      district,
      boss: BOSS_MAP[district] || 'DIBA',
      description: description.slice(0, 280),
      triggers: extractTriggers(description),
      skillPath: filePath.replace(/\\/g, '/'),
      source,
      role: 'villager',
      status: 'dormant',
    });
  }

  const villagers = [...byName.values()].sort((a, b) => a.district.localeCompare(b.district) || a.id.localeCompare(b.id));

  const districtCounts = {};
  for (const v of villagers) {
    districtCounts[v.district] = (districtCounts[v.district] || 0) + 1;
  }

  let idx = 0;
  for (const district of Object.keys(DISTRICTS)) {
    const inDistrict = villagers.filter((v) => v.district === district);
    inDistrict.forEach((v, i) => {
      const cols = Math.ceil(Math.sqrt(inDistrict.length + 1));
      v.gridX = i % cols;
      v.gridY = Math.floor(i / cols);
    });
  }

  const registry = {
    generatedAt: new Date().toISOString(),
    version: '1.0.0',
    districts: DISTRICTS,
    bosses: STAFF_BOSSES,
    villagers,
    stats: {
      totalVillagers: villagers.length,
      totalBosses: STAFF_BOSSES.length,
      districtCounts,
    },
  };

  const dataDir = path.join(ROOT, 'data');
  const warRoomDir = path.join(ROOT, 'war-room');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(warRoomDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, 'agents.json'), JSON.stringify(registry, null, 2));

  const jsContent = `// Auto-generated by scan-skills.mjs — do not edit manually\nwindow.WAR_ROOM_DATA = ${JSON.stringify(registry)};\n`;
  fs.writeFileSync(path.join(warRoomDir, 'agents-data.js'), jsContent);

  console.log(`Scanned ${allFiles.length} SKILL.md files`);
  console.log(`Unique NPCs: ${villagers.length} villagers + ${STAFF_BOSSES.length} bosses`);
  console.log(`Written: data/agents.json, war-room/agents-data.js`);
}

main();
