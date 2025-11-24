# Netflix MVP Backend

A production-ready REST API backend for the Netflix MVP frontend, built with Node.js, Express, and TypeScript.

## 🚀 Features

- **Authentication**: JWT-based auth with refresh tokens
- **Catalog**: Paginated movie/show browsing
- **Title Details**: Detailed information for each title
- **Playback**: HLS streaming with signed URLs
- **Recommendations**: Home and title-specific recommendations
- **Account Management**: User profile updates

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installing Node.js on Windows

1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the prompts
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## 🛠️ Installation

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` (already done)
   - Update values as needed (defaults work for local development)

## 🏃 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login and get JWT
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout (invalidate refresh token)

### Catalog & Titles
- `GET /catalog?cursor=&pageSize=` - Get paginated catalog
- `GET /titles/:id` - Get title details

### Playback
- `POST /play/start` - Start playback (requires auth)
- `POST /play/heartbeat` - Send playback heartbeat (requires auth)

### Recommendations
- `GET /recs/home` - Get home recommendations (requires auth)
- `GET /recs/for/:titleId` - Get similar titles (requires auth)

### Account
- `GET /me` - Get user profile (requires auth)
- `PATCH /me` - Update user profile (requires auth)

## 🔐 Authentication

Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🗂️ Project Structure

```
Backend/
├── src/
│   ├── config/          # Configuration files
│   ├── db/              # In-memory database (mock data)
│   ├── middleware/      # Express middleware
│   ├── routes/          # API route handlers
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── validation/      # Zod validation schemas
│   └── index.ts         # Application entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## 🔄 Frontend Integration

Update your frontend `.env` file to point to this backend:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 📝 Example Requests

### Sign Up
```bash
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
```

### Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get Catalog
```bash
curl http://localhost:5000/catalog?pageSize=10
```

### Get Title Details
```bash
curl http://localhost:5000/titles/tt1000
```

## 🧪 Testing

The backend includes:
- **Zod validation** for all request bodies
- **Error handling** middleware
- **Mock data** for 100 titles with details

## 🚧 Production Considerations

This is an MVP. For production, you should:

1. **Database**: Replace in-memory storage with PostgreSQL/MongoDB
2. **CDN**: Integrate with actual CDN (AWS CloudFront, Cloudflare)
3. **DRM**: Implement Widevine/FairPlay license server
4. **Caching**: Add Redis for session management
5. **Rate Limiting**: Implement rate limiting middleware
6. **Logging**: Add structured logging (Winston, Pino)
7. **Monitoring**: Add APM (New Relic, DataDog)
8. **Security**: 
   - Use HTTPS only
   - Implement CSRF protection
   - Add rate limiting
   - Rotate JWT secrets regularly

## 📄 License

ISC
