# DIBA Memory Inject — UserPromptSubmit hook
# Injects compact context before every message

$dibaDir = "C:\Users\Administrator\xdibax\DIBA"
$date = Get-Date -Format "yyyy-MM-dd HH:mm"

# Read first line of current-session.md (last session topic)
$sessionFile = "$dibaDir\main\current-session.md"
$lastSession = ""
if (Test-Path $sessionFile) {
    $firstLine = Get-Content $sessionFile | Where-Object { $_.Trim() -ne "" } | Select-Object -First 1
    if ($firstLine) { $lastSession = $firstLine.Trim() }
}

# Check open reminders
$reminderFile = "$dibaDir\main\reminders.md"
$openReminders = "none"
if (Test-Path $reminderFile) {
    $content = Get-Content $reminderFile -Raw
    if ($content -match '(?s)## Open\s*\n(.*?)(?=\n##|\z)') {
        $section = $Matches[1].Trim()
        if ($section -ne "") { $openReminders = $section -replace '\n', ' | ' }
    }
}

Write-Output "[DIBA | $date | Reminders: $openReminders]"
if ($lastSession) { Write-Output "[Last: $lastSession]" }
