# Quick GitHub Push Script
# Run this in PowerShell from the Netflix directory

Write-Host "🚀 Netflix MVP - GitHub Push Helper" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git installed: $gitVersion`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not installed. Please install from https://git-scm.com/`n" -ForegroundColor Red
    exit
}

# Check if already initialized
if (Test-Path ".git") {
    Write-Host "⚠️  Git repository already initialized`n" -ForegroundColor Yellow
} else {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repository initialized`n" -ForegroundColor Green
}

# Show current status
Write-Host "📊 Current Status:" -ForegroundColor Cyan
git status --short

Write-Host "`n📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: netflix-mvp (or your choice)" -ForegroundColor White
Write-Host "3. Make it Public or Private" -ForegroundColor White
Write-Host "4. DO NOT initialize with README" -ForegroundColor Yellow
Write-Host "5. Click 'Create repository'`n" -ForegroundColor White

Write-Host "Then run these commands:" -ForegroundColor Cyan
Write-Host "git add ." -ForegroundColor White
Write-Host "git commit -m 'Initial commit: Netflix MVP'" -ForegroundColor White
Write-Host "git branch -M main" -ForegroundColor White
Write-Host "git remote add origin https://github.com/YOUR-USERNAME/netflix-mvp.git" -ForegroundColor White
Write-Host "git push -u origin main`n" -ForegroundColor White

Write-Host "📚 Full guide: See GITHUB_SETUP.md" -ForegroundColor Cyan
Write-Host "🔑 Need help? Personal Access Token required (not password)" -ForegroundColor Yellow
Write-Host "   Create at: https://github.com/settings/tokens`n" -ForegroundColor Yellow

# Ask if user wants to add and commit now
$response = Read-Host "Do you want to add and commit all files now? (y/n)"
if ($response -eq 'y' -or $response -eq 'Y') {
    Write-Host "`n📦 Adding all files..." -ForegroundColor Yellow
    git add .
    
    Write-Host "💾 Creating commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: Netflix MVP with frontend, backend, and documentation"
    
    Write-Host "`n✅ Files committed!" -ForegroundColor Green
    Write-Host "`nNow create your GitHub repository and run:" -ForegroundColor Cyan
    Write-Host "git remote add origin https://github.com/YOUR-USERNAME/netflix-mvp.git" -ForegroundColor White
    Write-Host "git branch -M main" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
} else {
    Write-Host "`n👍 No problem! Follow the steps above when ready." -ForegroundColor Green
}

Write-Host "`n✨ Done!" -ForegroundColor Cyan
