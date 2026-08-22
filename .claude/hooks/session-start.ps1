# DIBA Session Start — Auto-install skills to ~/.claude/skills/
# Converted from session-start.sh for Windows PowerShell

$dibaDir = "C:\Users\Administrator\xdibax\DIBA"
$skillsDir = "$env:USERPROFILE\.claude\skills"

if (-not (Test-Path $skillsDir)) {
    New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null
}

function Install-Skill {
    param([string]$skillMd)
    if (-not (Test-Path $skillMd)) { return }

    $skillName = Get-Content $skillMd | Where-Object { $_ -match "^name:" } | Select-Object -First 1
    if ($skillName) {
        $skillName = $skillName -replace "^name:\s*", "" -replace '"', '' -replace "'", "" -replace "\[skill-name\]", ""
        $skillName = $skillName.Trim()
    }
    if (-not $skillName -or $skillName -eq "") { return }

    $dest = "$skillsDir\$skillName"
    if (-not (Test-Path $dest)) {
        New-Item -ItemType Directory -Path $dest -Force | Out-Null
    }
    Copy-Item -Path $skillMd -Destination "$dest\SKILL.md" -Force
}

# Layer 1: Feature skills
Get-ChildItem -Path "$dibaDir\Feature" -Recurse -Filter "SKILL.md" -ErrorAction SilentlyContinue | ForEach-Object {
    Install-Skill $_.FullName
}

# Layer 2: Plugin skills (override — newer versions win)
Get-ChildItem -Path "$dibaDir\plugins\diba-skills\skills" -Recurse -Filter "SKILL.md" -ErrorAction SilentlyContinue | ForEach-Object {
    Install-Skill $_.FullName
}

$total = (Get-ChildItem -Path $skillsDir -Directory -ErrorAction SilentlyContinue).Count
Write-Output "DIBA: $total skills active"
