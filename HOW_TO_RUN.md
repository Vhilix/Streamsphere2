# 🚀 How to Run Your Netflix MVP

Quick guide to get your Netflix MVP running locally.

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- ✅ Node.js installed (check with `node --version`)
- ✅ npm installed (check with `npm --version`)

If not installed, download from: https://nodejs.org/

---

## 🎬 Step-by-Step Instructions

### Step 1: Start the Backend (Terminal 1)

```powershell
# Navigate to Backend folder
cd "C:\Users\kbaz1\Downloads\Netflix\Backend"

# Install dependencies (first time only)
npm install

# Start the backend server
npm run dev
```

**Expected output:**
```
🚀 Server running on port 5000
📍 Environment: development
🔗 CORS enabled for: http://localhost:3000
```

**Keep this terminal open!**

---

### Step 2: Start the Frontend (Terminal 2)

Open a **NEW** PowerShell window and run:

```powershell
# Navigate to Frontend folder
cd "C:\Users\kbaz1\Downloads\Netflix\Front End"

# Install dependencies (first time only)
npm install

# Start the frontend
npm run dev
```

**Expected output:**
```
  VITE v6.3.5  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Your browser should automatically open to http://localhost:3000**

If not, manually open: **http://localhost:3000**

---

## ✅ Verify It's Working

1. **Backend Health Check**
   - Open: http://localhost:5000/health
   - Should see: `{"status":"ok","timestamp":"..."}`

2. **Frontend**
   - Open: http://localhost:3000
   - Should see: Sign In page

3. **Test Sign Up**
   - Click "Sign Up"
   - Enter email, password, name
   - Click "Sign Up"
   - Should redirect to Home page with catalog

---

## 🛑 Stopping the Servers

In each terminal window, press:
```
Ctrl + C
```

Then confirm with `Y` if prompted.

---

## 🔄 Restarting

Just run the same commands again:
- Backend: `npm run dev` in Backend folder
- Frontend: `npm run dev` in Front End folder

---

## 🐛 Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org/

### "Port 5000 already in use"
→ Kill the process or change port in `Backend/.env`

### "Port 3000 already in use"
→ Vite will automatically try 3001, 3002, etc.

### Frontend shows blank page
→ Check browser console (F12) for errors
→ Make sure backend is running on port 5000

### Can't sign in
→ Sign up first to create an account
→ Backend uses in-memory storage, so restart = data lost

---

## 📱 Accessing from Phone/Tablet

1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Update `Backend/.env`:
   ```
   CORS_ORIGIN=http://192.168.1.100:3000
   ```

3. Restart backend

4. On your phone, open:
   ```
   http://192.168.1.100:3000
   ```

---

## 🎯 What You Can Do

- ✅ Sign up / Sign in
- ✅ Browse catalog (100 titles)
- ✅ View title details
- ✅ Start playback (demo video)
- ✅ Update account settings

---

## 📊 Ports Used

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

---

**Enjoy your Netflix MVP!** 🎬
