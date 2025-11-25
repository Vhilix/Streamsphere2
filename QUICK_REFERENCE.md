# 🎬 Netflix MVP - Quick Reference Card

## 🚀 Running the Application

### First Time Setup

```powershell
# 1. Install Node.js from https://nodejs.org/ (LTS version)

# 2. Install Backend Dependencies
cd "C:\Users\kbaz1\Downloads\Netflix\Backend"
npm install

# 3. Install Frontend Dependencies  
cd "C:\Users\kbaz1\Downloads\Netflix\Front End"
npm install
```

### Every Time You Want to Run

**Terminal 1 - Backend:**
```powershell
cd "C:\Users\kbaz1\Downloads\Netflix\Backend"
npm run dev
```
✅ Backend runs on: **http://localhost:5000**

**Terminal 2 - Frontend:**
```powershell
cd "C:\Users\kbaz1\Downloads\Netflix\Front End"
npm run dev
```
✅ Frontend opens at: **http://localhost:3000**

---

## 🔗 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | Main application |
| **Backend API** | http://localhost:5000 | REST API |
| **Health Check** | http://localhost:5000/health | Verify backend is running |

---

## 🎯 Quick Actions

### Sign Up
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Enter email, password, name
4. Click "Sign Up"
5. ✅ Redirected to Home

### Browse Catalog
- Home page shows 100 mock titles
- Scroll to see more
- Click any title for details

### Play Video
1. Click on a title
2. Click "Play"
3. Demo HLS stream plays

---

## 🛑 Stopping the Servers

In each terminal:
```
Ctrl + C
```

---

## 📁 Project Structure

```
Netflix/
├── Backend/          → API Server (Port 5000)
│   └── npm run dev
│
├── Front End/        → React App (Port 3000)
│   └── npm run dev
│
└── Documentation/    → All guides
```

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js |
| Port 5000 in use | Change port in `Backend/.env` |
| Can't sign in | Sign up first! |
| Blank page | Check backend is running |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `INSTALL_NODEJS.md` | Install Node.js |
| `HOW_TO_RUN.md` | Run the application |
| `QUICKSTART.md` | Complete setup |
| `README.md` | Project overview |
| `ARCHITECTURE.md` | System design |

---

## ⚡ Quick Commands

```powershell
# Check if Node.js is installed
node --version
npm --version

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Check Git status
git status
```

---

## 🎨 Features Available

- ✅ User Authentication (Sign Up / Sign In)
- ✅ Browse Catalog (100 titles)
- ✅ Title Details Page
- ✅ Video Playback (Demo stream)
- ✅ Account Management
- ✅ Recommendations
- ✅ Protected Routes

---

## 🔑 Test Credentials

Create your own by signing up!
- Backend uses in-memory storage
- Data resets when backend restarts

---

## 📊 Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Router

**Backend:**
- Node.js
- Express
- TypeScript
- JWT Auth
- Zod Validation

---

## 🚀 Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install` in both folders
3. ✅ Start backend server
4. ✅ Start frontend server
5. ✅ Open http://localhost:3000
6. ✅ Sign up and explore!

---

**Need help? Check the documentation files!** 📚
