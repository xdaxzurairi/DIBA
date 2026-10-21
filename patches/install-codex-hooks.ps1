$ErrorActionPreference = 'Stop'
$workspaceDir = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$userCodexDir = Join-Path $env:USERPROFILE '.codex'
$projectCodexDir = Join-Path $workspaceDir '.codex'
$backupDir = Join-Path $PSScriptRoot ('codex-hooks-backup-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
# Parse before changing any installed file.
Get-Content -LiteralPath (Join-Path $PSScriptRoot 'codex-global-hooks.json') -Raw | ConvertFrom-Json | Out-Null
Get-Content -LiteralPath (Join-Path $PSScriptRoot 'codex-project-hooks.json') -Raw | ConvertFrom-Json | Out-Null
New-Item -ItemType Directory -Path $backupDir | Out-Null
Copy-Item -LiteralPath (Join-Path $userCodexDir 'hooks.json') -Destination (Join-Path $backupDir 'global-hooks.json')
Copy-Item -LiteralPath (Join-Path $projectCodexDir 'hooks.json') -Destination (Join-Path $backupDir 'project-hooks.json')
New-Item -ItemType Directory -Force -Path (Join-Path $userCodexDir 'hooks'), (Join-Path $projectCodexDir 'hooks') | Out-Null
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'codex-hook.cjs') -Destination (Join-Path $userCodexDir 'hooks/diba-hook.cjs')
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'codex-ruflo-hook.cjs') -Destination (Join-Path $projectCodexDir 'hooks/ruflo-hook.cjs')
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'codex-global-hooks.json') -Destination (Join-Path $userCodexDir 'hooks.json')
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'codex-project-hooks.json') -Destination (Join-Path $projectCodexDir 'hooks.json')
Write-Output "Installed hook repair. Backup: $backupDir"
Write-Output 'Hook trust unchanged. Review changed hooks using /hooks, then start/resume a session.'
