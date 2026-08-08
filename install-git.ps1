$url = 'https://github.com/git-for-windows/git/releases/download/v2.45.2.windows.1/Git-2.45.2-64-bit.exe'
$output = "$env:TEMP\Git-Installer.exe"
Write-Host 'Downloading Git...'
Invoke-WebRequest -Uri $url -OutFile $output
Write-Host 'Installing Git (this may take a minute)...'
Start-Process -FilePath $output -ArgumentList '/VERYSILENT /NORESTART /NOCANCEL /SP- /CLOSEAPPLICATIONS /RESTARTAPPLICATIONS' -Wait
Write-Host 'Git installation complete. You may need to restart your terminal to use it.'
