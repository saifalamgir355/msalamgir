# Publish the website: .\deploy.ps1 "what you changed"
param([string]$Message = "Update website")
Set-Location -Path $PSScriptRoot
git add -A
$changes = git status --porcelain
if (-not $changes) { Write-Host "Nothing changed - site is already up to date." -ForegroundColor Yellow; exit 0 }
git commit -m $Message
git push
if ($LASTEXITCODE -eq 0) {
  Write-Host "Pushed. Live at https://msalamgir.com in about 1 minute." -ForegroundColor Green
} else {
  Write-Host "Push failed - read the message above." -ForegroundColor Red
}
