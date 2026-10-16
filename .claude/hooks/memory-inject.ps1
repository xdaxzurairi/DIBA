# DIBA Memory Inject — UserPromptSubmit hook
# Injects compact context before every message

# Force UTF-8 in/out — Windows PowerShell defaults to the system codepage for
# both Get-Content and stdout, which mangles em-dashes/arrows in BOM-less
# UTF-8 memory files (e.g. "—" -> "�?"").
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$dibaDir = "C:\Users\Administrator\xdibax\DIBA"
$date = Get-Date -Format "yyyy-MM-dd HH:mm"

# Read last session topic from current-session.md (skip the static "# ..." heading)
$sessionFile = "$dibaDir\main\current-session.md"
$lastSession = ""
if (Test-Path $sessionFile) {
    $contentLines = Get-Content $sessionFile -Encoding UTF8 | Where-Object { $_.Trim() -ne "" -and $_.Trim() -notmatch '^#' }
    $topikLine = $contentLines | Where-Object { $_ -match '^\*\*Topik:\*\*' } | Select-Object -First 1
    if ($topikLine) {
        $lastSession = $topikLine.Trim()
    } elseif ($contentLines) {
        $lastSession = ($contentLines | Select-Object -First 1).Trim()
    }
}

# Check open reminders
$reminderFile = "$dibaDir\main\reminders.md"
$openReminders = "none"
if (Test-Path $reminderFile) {
    $content = Get-Content $reminderFile -Raw -Encoding UTF8
    if ($content -match '(?s)## Open\s*\n(.*?)(?=\n##|\z)') {
        $section = $Matches[1].Trim()
        if ($section -ne "") { $openReminders = $section -replace '\n', ' | ' }
    }
}

Write-Output "[DIBA | $date | Reminders: $openReminders]"
if ($lastSession) { Write-Output "[Last: $lastSession]" }
