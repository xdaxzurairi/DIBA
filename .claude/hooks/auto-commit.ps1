# DIBA Auto-Commit — PostToolUse hook (Write/Edit)
# Auto-commits changes to DIBA memory files

$dibaDir = "C:\Users\Administrator\xdibax\DIBA"
$memoryPaths = @("main\", "daily-diary\", "projects\", "plans\", "company\")

# Parse tool input to get file path
$toolInput = $env:CLAUDE_TOOL_INPUT
if (-not $toolInput) { exit 0 }

try {
    $parsed = $toolInput | ConvertFrom-Json
    $filePath = $parsed.file_path
} catch { exit 0 }

if (-not $filePath) { exit 0 }

# Only commit if file is in DIBA memory dirs
$isMemoryFile = $false
foreach ($path in $memoryPaths) {
    if ($filePath -like "*\DIBA\$path*" -or $filePath -like "*/DIBA/$path*") {
        $isMemoryFile = $true
        break
    }
}

if (-not $isMemoryFile) { exit 0 }

# Auto-commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$shortName = Split-Path $filePath -Leaf

Push-Location $dibaDir
try {
    git add $filePath 2>$null
    $staged = git diff --cached --name-only 2>$null
    if ($staged) {
        git commit -m "diba: auto-save $shortName ($timestamp)" --no-verify 2>$null | Out-Null
    }
} finally {
    Pop-Location
}
