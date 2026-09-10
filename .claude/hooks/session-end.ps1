# DIBA Session End - Stop hook
# Writes session end timestamp + auto-commits any unstaged DIBA memory changes,
# then pushes to origin so GitHub stays in sync (auto-sync, approved 2026-09-10).
# The push is best-effort: silent on failure, never blocks the session.

$dibaDir = "C:\Users\Administrator\xdibax\DIBA"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

Push-Location $dibaDir
try {
    # Stage any unstaged memory file changes
    $memoryDirs = @("main", "daily-diary", "projects", "plans", "company")
    foreach ($dir in $memoryDirs) {
        git add "$dir/" 2>$null
    }

    $staged = git diff --cached --name-only 2>$null
    if ($staged) {
        git commit -m "diba: session-end auto-save ($timestamp)" --no-verify 2>$null | Out-Null
        Write-Output "DIBA: session saved + committed at $timestamp"
    } else {
        Write-Output "DIBA: session end $timestamp - no changes to commit"
    }

    # Auto-sync: push if the branch is ahead of its upstream. Best-effort.
    $branch = git symbolic-ref --quiet --short HEAD 2>$null
    git rev-parse --verify --quiet "@{upstream}" 2>$null | Out-Null
    if ($branch -and $LASTEXITCODE -eq 0) {
        $ahead = git rev-list --count "@{upstream}..HEAD" 2>$null
        if ([int]($ahead | Select-Object -First 1) -gt 0) {
            git push --quiet origin $branch 2>$null | Out-Null
            if ($LASTEXITCODE -eq 0) {
                Write-Output "DIBA: pushed $ahead commit(s) to origin/$branch"
            } else {
                Write-Output "DIBA: auto-push skipped (offline / auth / non-fast-forward) - retries next session-end"
            }
        }
    }
} finally {
    Pop-Location
}
