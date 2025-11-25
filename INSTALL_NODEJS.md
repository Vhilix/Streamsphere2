# 📦 Installing Node.js on Windows

Node.js is required to run your Netflix MVP. Follow these steps to install it.

---

## 🚀 Quick Installation (5 Minutes)

### Step 1: Download Node.js

1. Go to: **https://nodejs.org/**
2. You'll see two versions:
   - **LTS (Long Term Support)** - Recommended ✅
   - **Current** - Latest features

3. Click the **LTS** button to download
   - File will be named something like: `node-v20.10.0-x64.msi`

### Step 2: Install Node.js

1. **Run the downloaded installer** (double-click the .msi file)
2. Click **"Next"** on the welcome screen
3. **Accept the license agreement** → Click "Next"
4. **Installation path**: Keep default (`C:\Program Files\nodejs\`) → Click "Next"
5. **Custom Setup**: Keep all defaults → Click "Next"
6. **Tools for Native Modules**: Check the box ✅ (optional but recommended) → Click "Next"
7. Click **"Install"**
8. Wait for installation to complete (~2 minutes)
9. Click **"Finish"**

### Step 3: Verify Installation

1. **Close any open PowerShell/Command Prompt windows**
2. Open a **new** PowerShell window
3. Run these commands:

```powershell
# Check Node.js version
node --version
# Should show: v20.10.0 (or similar)

# Check npm version
npm --version
# Should show: 10.2.3 (or similar)
```

If both commands work, **you're ready!** ✅

---

## 🎯 After Installation

Once Node.js is installed, you can run your Netflix MVP:

### Quick Start

**Terminal 1 - Backend:**
```powershell
cd "C:\Users\kbaz1\Downloads\Netflix\Backend"
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd "C:\Users\kbaz1\Downloads\Netflix\Front End"
npm install
npm run dev
```

Then open: **http://localhost:3000**

---

## 🐛 Troubleshooting

### "node: command not found" after installation

**Solution**: Restart your computer
- Node.js adds itself to PATH, but requires restart to take effect

### "npm: command not found" but node works

**Solution**: Reinstall Node.js
- npm should come with Node.js automatically

### Installation fails

**Solutions**:
1. **Run as Administrator**: Right-click installer → "Run as administrator"
2. **Disable antivirus** temporarily during installation
3. **Clear temp files**: Delete `C:\Users\kbaz1\AppData\Local\Temp\*`

### Wrong version installed

**Solution**: Uninstall and reinstall
1. Control Panel → Programs → Uninstall Node.js
2. Download correct version from nodejs.org
3. Install again

---

## 📊 What Gets Installed

- **Node.js**: JavaScript runtime
- **npm**: Package manager (installs libraries)
- **npx**: Package runner (runs commands)

---

## 🔧 Optional: Update npm

After installing Node.js, you can update npm to the latest version:

```powershell
npm install -g npm@latest
```

---

## ✅ Installation Checklist

- [ ] Downloaded Node.js LTS from nodejs.org
- [ ] Ran installer with default settings
- [ ] Closed old PowerShell windows
- [ ] Opened new PowerShell window
- [ ] Verified `node --version` works
- [ ] Verified `npm --version` works
- [ ] Ready to run Netflix MVP!

---

## 🎬 Next Steps

After Node.js is installed:

1. **Read**: `HOW_TO_RUN.md` - How to start the application
2. **Read**: `QUICKSTART.md` - Complete setup guide
3. **Run**: Backend and Frontend servers
4. **Enjoy**: Your Netflix MVP at http://localhost:3000

---

## 📱 Alternative: Using nvm-windows (Advanced)

For managing multiple Node.js versions:

1. Download nvm-windows: https://github.com/coreybutler/nvm-windows/releases
2. Install nvm-windows
3. Run:
   ```powershell
   nvm install 20.10.0
   nvm use 20.10.0
   ```

---

## 🔗 Useful Links

- **Node.js Official**: https://nodejs.org/
- **npm Documentation**: https://docs.npmjs.com/
- **Node.js Guides**: https://nodejs.org/en/docs/guides/

---

**Download Node.js now and get your Netflix MVP running!** 🚀
