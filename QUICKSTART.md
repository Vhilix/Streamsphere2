# Quick Start Guide - Netflix MVP

## Prerequisites Check

Before starting, ensure you have Node.js installed:

```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/ (LTS version recommended)

## Step 1: Install Backend Dependencies

```bash
cd Backend
npm install
```

## Step 2: Start the Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Environment: development
🔗 CORS enabled for: http://localhost:3000
```

## Step 3: Install Frontend Dependencies (in a new terminal)

```bash
cd "Front End"
npm install
```

## Step 4: Start the Frontend

```bash
npm run dev
```

The frontend will open at: http://localhost:3000

## Step 5: Test the Application

1. **Sign Up**: Create a new account
2. **Browse**: View the catalog of titles
3. **Details**: Click on a title to see details
4. **Play**: Start playback (uses demo HLS stream)

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify all dependencies installed: `npm install`
- Check Node.js version: `node --version` (should be v18+)

### Frontend won't start
- Check if port 3000 is available
- Verify `.env` file exists in "Front End" directory
- Clear cache: `npm cache clean --force` then `npm install`

### CORS errors
- Ensure backend is running on port 5000
- Check `.env` in both frontend and backend
- Backend CORS_ORIGIN should match frontend URL

### Authentication errors
- Clear browser localStorage
- Check JWT_SECRET in backend `.env`
- Try signing up with a new account

## API Testing (Optional)

Use the included `api-tests.http` file with VS Code REST Client extension, or use curl/Postman.

## Next Steps

- Explore the code in `Backend/src/routes/`
- Customize mock data in `Backend/src/db/index.ts`
- Add new features to match your requirements
