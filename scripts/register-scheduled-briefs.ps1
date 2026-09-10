# Registers the two DIBA scheduled-brief tasks in Windows Task Scheduler.
# Run once:  ! powershell -ExecutionPolicy Bypass -File C:\Users\Administrator\xdibax\DIBA\scripts\register-scheduled-briefs.ps1
# Re-running is safe (tasks are replaced). To remove: see bottom of this file.

$bash = 'C:\Program Files\Git\bin\bash.exe'
$script = '/c/Users/Administrator/xdibax/DIBA/scripts/scheduled-brief.sh'

function New-BriefTask($name, $mode, $trigger) {
    $action  = New-ScheduledTaskAction -Execute $bash -Argument "-lc `"$script $mode`""
    $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd `
                  -ExecutionTimeLimit (New-TimeSpan -Minutes 20)
    Register-ScheduledTask -TaskName $name -Action $action -Trigger $trigger `
        -Settings $settings -Description "DIBA automated $mode brief -> main/brief-inbox.md" -Force
}

New-BriefTask "DIBA Morning Brief" "morning" (New-ScheduledTaskTrigger -Daily -At 8:00am)
New-BriefTask "DIBA Weekly Review" "weekly" (New-ScheduledTaskTrigger -Weekly -DaysOfWeek Friday -At 4:00pm)

Get-ScheduledTask -TaskName "DIBA *" | Select-Object TaskName, State
Write-Host "`nDone. Test now with:  & '$bash' -lc `"$script morning`""

# --- To remove later ---
# Unregister-ScheduledTask -TaskName "DIBA Morning Brief","DIBA Weekly Review" -Confirm:$false
