# Tell Bing / Yandex about new or changed pages instantly.
# Run after every deploy:  .\submit-indexnow.ps1
$key  = "e7f6f549157f4be1b988b95e0373bb36"
$host = "msalamgir.com"
$urls = @(
  "https://msalamgir.com/",
  "https://msalamgir.com/deed-writer-chattogram/",
  "https://msalamgir.com/before-buying-land/",
  "https://msalamgir.com/khatian-check/",
  "https://msalamgir.com/warish-certificate/",
  "https://msalamgir.com/deed-search/",
  "https://msalamgir.com/legal-help/",
  "https://msalamgir.com/deed-registration/",
  "https://msalamgir.com/flat-registration/",
  "https://msalamgir.com/namjari/",
  "https://msalamgir.com/land-survey/",
  "https://msalamgir.com/land-units/"
)
$body = @{ host = $host; key = $key; keyLocation = "https://$host/$key.txt"; urlList = $urls } | ConvertTo-Json
try {
  Invoke-RestMethod -Uri "https://api.indexnow.org/indexnow" -Method Post -ContentType "application/json; charset=utf-8" -Body $body
  Write-Host "Submitted $($urls.Count) URLs to IndexNow." -ForegroundColor Green
} catch {
  Write-Host "IndexNow submission failed: $($_.Exception.Message)" -ForegroundColor Red
}
