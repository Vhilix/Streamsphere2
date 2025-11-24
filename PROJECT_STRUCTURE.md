# Netflix MVP - Complete Project Structure

## 📁 Project Overview

```
Netflix/
├── Backend/                    # Node.js/Express API Server
├── Front End/                  # React/Vite Frontend
├── QUICKSTART.md              # Quick start guide
└── ENDPOINT_MAPPING.md        # API endpoint documentation
```

---

## 🔧 Backend Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── index.ts           # Environment configuration
│   │
│   ├── db/
│   │   └── index.ts           # In-memory database & mock data
│   │
│   ├── middleware/
│   │   ├── auth.ts            # JWT authentication middleware
│   │   ├── errorHandler.ts   # Global error handler
│   │   ├── notFoundHandler.ts # 404 handler
│   │   └── validation.ts      # Zod validation middleware
│   │
│   ├── routes/
│   │   ├── auth.routes.ts     # POST /auth/signup, /login, /refresh, /logout
│   │   ├── catalog.routes.ts  # GET /catalog
│   │   ├── title.routes.ts    # GET /titles/:id
│   │   ├── playback.routes.ts # POST /play/start, /heartbeat
│   │   ├── recs.routes.ts     # GET /recs/home, /for/:titleId
│   │   └── account.routes.ts  # GET /me, PATCH /me
│   │
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   │
│   ├── utils/
│   │   └── auth.ts            # Password hashing, JWT generation
│   │
│   ├── validation/
│   │   └── schemas.ts         # Zod validation schemas
│   │
│   └── index.ts               # Express app entry point
│
├── .env                       # Environment variables
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── api-tests.http             # API test requests
└── README.md                  # Backend documentation
```

---

## 🎨 Frontend Structure

```
Front End/
├── src/
│   ├── app/
│   │   ├── providers.tsx      # React Query, Router, Auth providers
│   │   └── routes.tsx         # Route definitions
│   │
│   ├── components/            # Reusable UI components (53 files)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── ...
│   │
│   ├── features/              # Feature-specific modules
│   │   ├── auth/
│   │   │   ├── AuthContext.tsx      # Auth state management
│   │   │   └── ProtectedRoute.tsx   # Route guard
│   │   ├── catalog/
│   │   │   └── api.ts               # Catalog API calls
│   │   ├── title/
│   │   │   └── api.ts               # Title details API
│   │   ├── playback/
│   │   │   └── api.ts               # Playback API
│   │   ├── recs/
│   │   │   └── api.ts               # Recommendations API
│   │   └── account/
│   │       └── api.ts               # Account API
│   │
│   ├── lib/
│   │   ├── api.ts             # Fetch wrapper with auth
│   │   ├── query.ts           # React Query client
│   │   ├── storage.ts         # localStorage helpers
│   │   ├── validation.ts      # Zod schemas
│   │   └── env.ts             # Environment variables
│   │
│   ├── pages/
│   │   ├── SignIn.tsx         # Login page
│   │   ├── SignUp.tsx         # Registration page
│   │   ├── Home.tsx           # Browse/catalog page
│   │   ├── Title.tsx          # Title details page
│   │   ├── Play.tsx           # Video player page
│   │   └── Account.tsx        # User account page
│   │
│   ├── types/
│   │   └── api.d.ts           # API type definitions
│   │
│   ├── App.tsx                # Root component
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles (Tailwind)
│
├── .env                       # Environment variables
├── index.html                 # HTML template
├── package.json               # Dependencies & scripts
├── vite.config.ts             # Vite configuration
└── README.md                  # Frontend documentation
```

---

## 🔑 Key Files Explained

### Backend

| File | Purpose |
|------|---------|
| `src/index.ts` | Express server setup, middleware, routes |
| `src/db/index.ts` | Mock data (100 titles, users array) |
| `src/middleware/auth.ts` | JWT verification for protected routes |
| `src/routes/*.routes.ts` | API endpoint handlers |
| `src/utils/auth.ts` | Password hashing, token generation |
| `.env` | Configuration (JWT secrets, CORS, port) |

### Frontend

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component with providers & routes |
| `src/app/routes.tsx` | React Router configuration |
| `src/features/auth/AuthContext.tsx` | Auth state & token management |
| `src/lib/api.ts` | HTTP client with auto token injection |
| `src/pages/*.tsx` | Page components |
| `.env` | API base URL configuration |

---

## 🚀 Running the Application

### Terminal 1 - Backend
```bash
cd Backend
npm install
npm run dev
```
**Runs on**: http://localhost:5000

### Terminal 2 - Frontend
```bash
cd "Front End"
npm install
npm run dev
```
**Runs on**: http://localhost:3000

---

## 📊 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Auth**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Security**: Helmet, CORS, bcryptjs

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Router**: React Router v6
- **State**: React Query (TanStack)
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Video**: hls.js

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## ✅ Implementation Status

All MVP specification requirements are **100% implemented**:

- ✅ Authentication (signup, login, refresh, logout)
- ✅ Catalog with pagination
- ✅ Title details
- ✅ Playback start & heartbeat
- ✅ Recommendations (home & title-specific)
- ✅ Account management (get/update profile)
- ✅ JWT-based auth with refresh tokens
- ✅ Protected routes
- ✅ Error handling
- ✅ Request validation
- ✅ CORS configuration
- ✅ TypeScript throughout

---

## 🎯 Next Steps

1. **Install Node.js** (if not already installed)
2. **Follow QUICKSTART.md** to run the application
3. **Test endpoints** using `api-tests.http`
4. **Customize** mock data in `Backend/src/db/index.ts`
5. **Deploy** to production (see Backend/README.md)
