# GitHub Push Checklist

Follow these steps to push your Netflix MVP to GitHub.

---

## ✅ Pre-Push Checklist

- [x] Git is installed (`git --version` works)
- [x] Git is configured (name and email set)
- [x] .gitignore files are in place
- [ ] GitHub account created
- [ ] Sensitive files protected (.env files)

---

## 📝 Step-by-Step Instructions

### Step 1: Create GitHub Repository (2 minutes)

1. Go to https://github.com/new
2. **Repository name**: `netflix-mvp`
3. **Description**: "Netflix MVP - Full-stack streaming application with React, Node.js, and AWS S3"
4. **Visibility**: Choose Public or Private
5. **Important**: DO NOT check any boxes (no README, no .gitignore, no license)
6. Click **"Create repository"**
7. **Keep this page open** - you'll need the URL

---

### Step 2: Initialize Git (1 minute)

Open PowerShell in `C:\Users\kbaz1\Downloads\Netflix` and run:

```powershell
# Initialize git repository
git init

# Check status (should show many untracked files)
git status
```

---

### Step 3: Add Files (1 minute)

```powershell
# Add all files to staging
git add .

# Verify what will be committed
git status
```

**Important**: Make sure `.env` files are NOT listed! They should be ignored.

---

### Step 4: Create First Commit (1 minute)

```powershell
# Create commit
git commit -m "Initial commit: Netflix MVP with frontend, backend, and documentation"
```

---

### Step 5: Connect to GitHub (1 minute)

Replace `YOUR-USERNAME` with your actual GitHub username:

```powershell
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/netflix-mvp.git

# Verify remote
git remote -v

# Rename branch to main
git branch -M main
```

---

### Step 6: Push to GitHub (2 minutes)

```powershell
# Push to GitHub
git push -u origin main
```

**When prompted for credentials:**
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (see below)

---

### Step 7: Create Personal Access Token (if needed)

If you don't have a token:

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: "Netflix MVP"
4. **Expiration**: 90 days
5. **Scopes**: Check **"repo"**
6. Click **"Generate token"**
7. **Copy the token** (save it somewhere safe!)
8. Use this token as your password when pushing

---

## 🎉 Success!

Your repository is now on GitHub at:
```
https://github.com/YOUR-USERNAME/netflix-mvp
```

---

## 🔄 Future Updates

When you make changes:

```powershell
# Add changes
git add .

# Commit
git commit -m "Describe your changes here"

# Push
git push
```

---

## 🚨 Troubleshooting

### "Permission denied"
→ Use Personal Access Token instead of password

### ".env file is being committed"
```powershell
# Remove from staging
git reset HEAD Backend/.env

# Add to .gitignore if not already there
echo "Backend/.env" >> .gitignore

# Commit again
git add .
git commit -m "Initial commit"
```

### "Remote origin already exists"
```powershell
# Remove and re-add
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/netflix-mvp.git
```

---

## 📚 Full Documentation

See `GITHUB_SETUP.md` for complete guide with more details and alternatives.

---

## ⚡ Quick Script

Or simply run:
```powershell
.\push-to-github.ps1
```

This script will guide you through the process interactively!

---

**Total Time: ~10 minutes** ⏱️
