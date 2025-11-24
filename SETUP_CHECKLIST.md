# 🎯 Netflix MVP - Setup Checklist

Use this checklist to get your Netflix MVP up and running!

---

## ✅ Prerequisites

- [ ] **Install Node.js** (v18 or higher)
  - Download from: https://nodejs.org/
  - Choose "LTS" version (recommended)
  - Verify: `node --version` and `npm --version`

---

## 🔧 Backend Setup

- [ ] **Navigate to Backend directory**
  ```bash
  cd Backend
  ```

- [ ] **Install dependencies**
  ```bash
  npm install
  ```
  This will install:
  - Express, CORS, Helmet
  - JWT, bcrypt
  - Zod, TypeScript
  - And more...

- [ ] **Verify .env file exists**
  - Should already be created
  - Contains JWT secrets, port, CORS settings

- [ ] **Start the backend server**
  ```bash
  npm run dev
  ```

- [ ] **Verify backend is running**
  - Check console for: `🚀 Server running on port 5000`
  - Test: Open http://localhost:5000/health in browser
  - Should see: `{"status":"ok","timestamp":"..."}`

---

## 🎨 Frontend Setup

- [ ] **Open a NEW terminal** (keep backend running)

- [ ] **Navigate to Frontend directory**
  ```bash
  cd "Front End"
  ```

- [ ] **Install dependencies**
  ```bash
  npm install
  ```
  This will install:
  - React, React Router
  - React Query, React Hook Form
  - Tailwind CSS, Radix UI
  - hls.js, Zod
  - And more...

- [ ] **Verify .env file is updated**
  - Should contain: `VITE_API_BASE_URL=http://localhost:5000`

- [ ] **Start the frontend**
  ```bash
  npm run dev
  ```

- [ ] **Verify frontend is running**
  - Should open automatically at http://localhost:3000
  - If not, open manually in browser

---

## 🧪 Testing

- [ ] **Test Sign Up**
  - Click "Sign Up" (or navigate to /signup)
  - Enter email, password, name
  - Click submit
  - Should redirect to Home page

- [ ] **Test Login**
  - Click "Sign In"
  - Enter same email/password
  - Should redirect to Home page

- [ ] **Test Catalog**
  - Should see rows of movie/show cards
  - Scroll to see more

- [ ] **Test Title Details**
  - Click on any title card
  - Should see details page with synopsis, similar titles

- [ ] **Test Playback**
  - Click "Play" on title details page
  - Video player should load
  - Demo HLS stream should play

- [ ] **Test Account**
  - Navigate to /account
  - Should see user profile
  - Try updating name

---

## 🔍 Troubleshooting

### Backend Issues

- [ ] **Port 5000 already in use?**
  - Change `PORT=5001` in `Backend/.env`
  - Update `VITE_API_BASE_URL` in `Front End/.env`

- [ ] **Dependencies won't install?**
  - Clear npm cache: `npm cache clean --force`
  - Delete `node_modules` folder
  - Run `npm install` again

- [ ] **TypeScript errors?**
  - Make sure TypeScript is installed: `npm install -g typescript`
  - Or use local version: `npx tsc --version`

### Frontend Issues

- [ ] **Port 3000 already in use?**
  - Vite will automatically try 3001, 3002, etc.
  - Or manually set in `vite.config.ts`

- [ ] **CORS errors?**
  - Verify backend is running on port 5000
  - Check `CORS_ORIGIN` in `Backend/.env`
  - Should match frontend URL

- [ ] **API errors?**
  - Check browser console (F12)
  - Verify `VITE_API_BASE_URL` in `Front End/.env`
  - Test backend directly: http://localhost:5000/health

### Authentication Issues

- [ ] **Can't login?**
  - Clear browser localStorage (F12 → Application → Local Storage → Clear)
  - Try signing up with a new email
  - Check backend console for errors

- [ ] **Token expired?**
  - Tokens expire after 24 hours (default)
  - Just login again
  - Or adjust `JWT_EXPIRES_IN` in `Backend/.env`

---

## 📊 Verification Commands

Run these to verify everything is working:

### Backend Health Check
```bash
curl http://localhost:5000/health
```
Expected: `{"status":"ok","timestamp":"..."}`

### Get Catalog
```bash
curl http://localhost:5000/catalog?pageSize=5
```
Expected: JSON with 5 titles

### Sign Up (PowerShell)
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
    name = "Test User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/auth/signup" -Method Post -Body $body -ContentType "application/json"
```

---

## 📁 File Locations

### Backend
- Main file: `Backend/src/index.ts`
- Routes: `Backend/src/routes/*.routes.ts`
- Config: `Backend/.env`

### Frontend
- Main file: `Front End/src/main.tsx`
- API client: `Front End/src/lib/api.ts`
- Config: `Front End/.env`

---

## 📚 Documentation

- [ ] **Read README.md** - Complete overview
- [ ] **Read QUICKSTART.md** - Quick setup guide
- [ ] **Read ENDPOINT_MAPPING.md** - API documentation
- [ ] **Read ARCHITECTURE.md** - System architecture
- [ ] **Read Backend/README.md** - Backend details

---

## 🎉 Success Criteria

You're done when:

- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ Can sign up and login
- ✅ Can browse catalog
- ✅ Can view title details
- ✅ Can start playback
- ✅ No console errors

---

## 🚀 Next Steps

After everything is working:

1. **Customize mock data**
   - Edit `Backend/src/db/index.ts`
   - Add your own titles, genres, etc.

2. **Explore the code**
   - Backend routes: `Backend/src/routes/`
   - Frontend pages: `Front End/src/pages/`
   - Components: `Front End/src/components/`

3. **Add features**
   - User profiles
   - Watch history
   - Favorites/watchlist
   - Search functionality

4. **Prepare for production**
   - Set up real database
   - Configure CDN
   - Add monitoring
   - Deploy to cloud

---

## ❓ Need Help?

1. Check the troubleshooting section above
2. Review the documentation files
3. Check browser console (F12) for errors
4. Check backend terminal for errors
5. Verify all environment variables

---

**Good luck! 🎬**
