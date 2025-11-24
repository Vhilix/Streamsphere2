# Pushing Netflix MVP to GitHub

This guide shows you how to push your Netflix MVP project to GitHub.

---

## 📋 Prerequisites

1. **Git installed** - Download from https://git-scm.com/
2. **GitHub account** - Sign up at https://github.com/
3. **GitHub Desktop** (optional) - Easier for Windows users

---

## 🚀 Method 1: Using Git Command Line (Recommended)

### Step 1: Install Git

1. Download Git from https://git-scm.com/download/win
2. Run the installer (use default settings)
3. Verify installation:
   ```powershell
   git --version
   ```

### Step 2: Configure Git (First Time Only)

```powershell
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### Step 3: Create GitHub Repository

1. Go to https://github.com/
2. Click the **"+"** icon → **"New repository"**
3. **Repository name**: `netflix-mvp` (or your preferred name)
4. **Description**: "Netflix MVP - Full-stack streaming application"
5. **Visibility**: Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **"Create repository"**

### Step 4: Initialize Git in Your Project

```powershell
# Navigate to your project
cd C:\Users\kbaz1\Downloads\Netflix

# Initialize git repository
git init

# Add all files to staging
git add .

# Create first commit
git commit -m "Initial commit: Netflix MVP with frontend and backend"
```

### Step 5: Connect to GitHub

```powershell
# Add remote repository (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/netflix-mvp.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 6: Enter GitHub Credentials

When prompted:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)

#### Creating a Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: "Netflix MVP"
4. **Expiration**: 90 days (or custom)
5. **Scopes**: Check **"repo"** (full control of private repositories)
6. Click **"Generate token"**
7. **Copy the token** (you won't see it again!)
8. Use this token as your password when pushing

---

## 🖥️ Method 2: Using GitHub Desktop (Easier for Windows)

### Step 1: Install GitHub Desktop

1. Download from https://desktop.github.com/
2. Install and sign in with your GitHub account

### Step 2: Add Your Project

1. Open GitHub Desktop
2. Click **"File"** → **"Add local repository"**
3. Click **"Choose..."** and select `C:\Users\kbaz1\Downloads\Netflix`
4. Click **"Add repository"**

If it says "This directory does not appear to be a Git repository":
1. Click **"create a repository"**
2. **Name**: Netflix MVP
3. **Description**: Full-stack streaming application
4. Click **"Create repository"**

### Step 3: Commit Your Files

1. You'll see all your files in the "Changes" tab
2. **Summary**: "Initial commit: Netflix MVP"
3. **Description** (optional): "Added frontend, backend, and documentation"
4. Click **"Commit to main"**

### Step 4: Publish to GitHub

1. Click **"Publish repository"**
2. **Name**: netflix-mvp
3. **Description**: Netflix MVP - Full-stack streaming application
4. Choose **Public** or **Private**
5. Uncheck **"Keep this code private"** if you want it public
6. Click **"Publish repository"**

Done! Your code is now on GitHub.

---

## 🔒 Important: Protect Sensitive Information

### Files Already Protected

Your `.gitignore` files are already set up to exclude:
- ✅ `Backend/.env` (contains secrets)
- ✅ `Backend/node_modules/`
- ✅ `Front End/node_modules/`
- ✅ `*.log` files

### Verify Before Pushing

```powershell
# Check what will be committed
git status

# Make sure .env is NOT listed
# If it is, add it to .gitignore
```

### If You Accidentally Committed Secrets

```powershell
# Remove .env from git (keeps local file)
git rm --cached Backend/.env
git commit -m "Remove .env from tracking"
git push

# Then change your secrets (JWT keys, AWS credentials)
```

---

## 📝 Recommended .gitignore (Already Created)

Your project already has proper `.gitignore` files, but here's what they should contain:

### Backend/.gitignore
```
node_modules/
dist/
.env
*.log
.DS_Store
coverage/
```

### Front End/.gitignore
```
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
```

---

## 🌿 Working with Git (Common Commands)

### Making Changes

```powershell
# Check status
git status

# Add specific file
git add Backend/src/index.ts

# Add all changes
git add .

# Commit changes
git commit -m "Add new feature"

# Push to GitHub
git push
```

### Viewing History

```powershell
# View commit history
git log

# View changes
git diff
```

### Creating Branches

```powershell
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Push branch to GitHub
git push -u origin feature/new-feature
```

---

## 📂 Repository Structure on GitHub

After pushing, your GitHub repo will look like:

```
netflix-mvp/
├── Backend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── Front End/
│   ├── src/
│   ├── package.json
│   └── README.md
├── README.md
├── QUICKSTART.md
├── ARCHITECTURE.md
├── ENDPOINT_MAPPING.md
├── AWS_S3_SETUP.md
└── ... (all documentation)
```

---

## 🎨 Customize Your Repository

### Add a Great README

Your main `README.md` is already comprehensive! It includes:
- ✅ Project overview
- ✅ Tech stack
- ✅ Setup instructions
- ✅ API documentation
- ✅ Architecture diagrams

### Add Topics/Tags

On GitHub:
1. Go to your repository
2. Click the gear icon next to "About"
3. Add topics: `react`, `nodejs`, `express`, `netflix-clone`, `streaming`, `typescript`

### Add a License

```powershell
# Create LICENSE file
# Choose from: MIT, Apache 2.0, GPL, etc.
# GitHub can generate this for you
```

---

## 🔄 Keeping Your Repo Updated

### Daily Workflow

```powershell
# 1. Make changes to your code
# 2. Check what changed
git status

# 3. Add changes
git add .

# 4. Commit with descriptive message
git commit -m "Add user profile feature"

# 5. Push to GitHub
git push
```

### Pull Latest Changes (if working from multiple computers)

```powershell
git pull origin main
```

---

## 🚨 Troubleshooting

### "Permission denied" error

**Solution**: Use Personal Access Token instead of password
1. Create token at https://github.com/settings/tokens
2. Use token as password when pushing

### "Remote origin already exists"

```powershell
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR-USERNAME/netflix-mvp.git
```

### "Failed to push some refs"

```powershell
# Pull first, then push
git pull origin main --rebase
git push
```

### Large files error

```powershell
# If you have files > 100MB
# Add to .gitignore or use Git LFS
git lfs install
git lfs track "*.mp4"
```

---

## 🌟 Best Practices

### Commit Messages

✅ **Good**:
```
Add user authentication
Fix video playback bug
Update README with setup instructions
```

❌ **Bad**:
```
Update
Fix stuff
Changes
```

### Commit Frequency

- Commit after completing a feature
- Commit before major refactoring
- Commit at end of work session
- Don't commit broken code

### Branch Strategy

```
main          → Production-ready code
develop       → Integration branch
feature/*     → New features
bugfix/*      → Bug fixes
hotfix/*      → Urgent production fixes
```

---

## 📱 GitHub Mobile App

Download GitHub mobile app to:
- View code on the go
- Review pull requests
- Check notifications
- Monitor repository activity

---

## 🔗 Useful Links

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **GitHub Desktop**: https://desktop.github.com/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

## ✅ Verification Checklist

After pushing, verify:

- [ ] Repository is visible on GitHub
- [ ] All files are present (except .env)
- [ ] README displays correctly
- [ ] .gitignore is working (no node_modules, no .env)
- [ ] Repository description is set
- [ ] Topics/tags are added
- [ ] License is added (optional)

---

## 🎯 Next Steps

1. **Clone on another machine**: `git clone https://github.com/YOUR-USERNAME/netflix-mvp.git`
2. **Set up CI/CD**: GitHub Actions for automated testing
3. **Enable GitHub Pages**: Host documentation
4. **Add collaborators**: Settings → Collaborators
5. **Protect main branch**: Settings → Branches → Add rule

---

**Your Netflix MVP is now on GitHub!** 🎉

Share your repository:
```
https://github.com/YOUR-USERNAME/netflix-mvp
```
