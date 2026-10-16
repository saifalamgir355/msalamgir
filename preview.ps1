# Preview the site on this computer: .\preview.ps1  then open http://localhost:8080
Set-Location -Path $PSScriptRoot
Write-Host "Preview running at http://localhost:8080  (press Ctrl+C to stop)" -ForegroundColor Green
Start-Process "http://localhost:8080"
npx --yes serve -l 8080 .
