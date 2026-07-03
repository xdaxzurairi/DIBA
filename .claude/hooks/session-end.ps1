# DIBA Session End — Stop hook
# Writes session end timestamp + auto-commits any unstaged DIBA memory changes

$dibaDir = "C:\Users\Administrator\xdibax\DIBA"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

Push-Location $dibaDir
try {
    # Stage any unstaged memory file changes
    $memoryDirs = @("main", "daily-diary", "projects", "plans", "company")
    foreach ($dir in $memoryDirs) {
        git add "$dir\" 2>$null
    }

    $staged = git diff --cached --name-only 2>$null
    if ($staged) {
        git commit -m "diba: session-end auto-save ($timestamp)" --no-verify 2>$null | Out-Null
        Write-Output "DIBA: session saved + committed at $timestamp"
    } else {
        Write-Output "DIBA: session end $timestamp — no changes to commit"
    }
} finally {
    Pop-Location
}
