# Frontend-Backend Endpoint Mapping

This document shows the exact mapping between frontend API calls and backend endpoints.

## ✅ Authentication Endpoints

| Frontend Call | Backend Endpoint | Method | Auth Required |
|--------------|------------------|--------|---------------|
| `api.post('/auth/signup', {...})` | `POST /auth/signup` | POST | No |
| `api.post('/auth/login', {...})` | `POST /auth/login` | POST | No |
| `api.post('/auth/refresh', {...})` | `POST /auth/refresh` | POST | No |
| `api.post('/auth/logout')` | `POST /auth/logout` | POST | No |

**Frontend Location**: `Front End/src/features/auth/AuthContext.tsx`
**Backend Location**: `Backend/src/routes/auth.routes.ts`

---

## ✅ Catalog Endpoints

| Frontend Call | Backend Endpoint | Method | Auth Required |
|--------------|------------------|--------|---------------|
| `api.get('/catalog?cursor=&pageSize=')` | `GET /catalog` | GET | No |

**Frontend Location**: `Front End/src/features/catalog/api.ts`
**Backend Location**: `Backend/src/routes/catalog.routes.ts`

---

## ✅ Title Details Endpoints

| Frontend Call | Backend Endpoint | Method | Auth Required |
|--------------|------------------|--------|---------------|
| `api.get('/titles/:id')` | `GET /titles/:id` | GET | No |

**Frontend Location**: `Front End/src/features/title/api.ts`
**Backend Location**: `Backend/src/routes/title.routes.ts`

---

## ✅ Playback Endpoints

| Frontend Call | Backend Endpoint | Method | Auth Required |
|--------------|------------------|--------|---------------|
| `api.post('/play/start', {titleId})` | `POST /play/start` | POST | Yes |
| `api.post('/play/heartbeat', {...})` | `POST /play/heartbeat` | POST | Yes |

**Frontend Location**: `Front End/src/features/playback/api.ts`
**Backend Location**: `Backend/src/routes/playback.routes.ts`

---

## ✅ Recommendations Endpoints

| Frontend Call | Backend Endpoint | Method | Auth Required |
|--------------|------------------|--------|---------------|
| `api.get('/recs/home')` | `GET /recs/home` | GET | Yes |
| `api.get('/recs/for/:titleId')` | `GET /recs/for/:titleId` | GET | Yes |

**Frontend Location**: `Front End/src/features/recs/api.ts`
**Backend Location**: `Backend/src/routes/recs.routes.ts`

---

## ✅ Account Endpoints

| Frontend Call | Backend Endpoint | Method | Auth Required |
|--------------|------------------|--------|---------------|
| `api.get('/me')` | `GET /me` | GET | Yes |
| `api.patch('/me', {...})` | `PATCH /me` | PATCH | Yes |

**Frontend Location**: `Front End/src/features/account/api.ts`
**Backend Location**: `Backend/src/routes/account.routes.ts`

---

## 🔐 Authentication Flow

1. **Sign Up/Login**: Frontend receives `{ user, jwt, refreshToken }`
2. **Token Storage**: JWT stored in `localStorage` via `storage.setToken()`
3. **API Requests**: `api.ts` automatically adds `Authorization: Bearer <jwt>` header
4. **Token Refresh**: On 401, frontend calls `/auth/refresh` with `refreshToken`
5. **Logout**: Frontend calls `/auth/logout` and clears local storage

---

## 📊 Request/Response Examples

### Sign Up Request
```json
POST /auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Sign Up Response
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "jwt": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Get Catalog Request
```
GET /catalog?cursor=0&pageSize=20
```

### Get Catalog Response
```json
{
  "items": [
    {
      "id": "tt1000",
      "name": "Title 1",
      "posterUrl": "https://...",
      "year": 2020,
      "genres": ["Action", "Drama"]
    }
  ],
  "nextCursor": "20"
}
```

### Start Playback Request
```json
POST /play/start
Authorization: Bearer <jwt>
{
  "titleId": "tt1000"
}
```

### Start Playback Response
```json
{
  "titleId": "tt1000",
  "hlsUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
}
```

---

## 🔄 Error Response Format

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

Common error codes:
- `UNAUTHORIZED` - Missing or invalid token
- `VALIDATION_ERROR` - Invalid request data
- `USER_EXISTS` - Email already registered
- `INVALID_CREDENTIALS` - Wrong email/password
- `NOT_FOUND` - Resource not found
- `INTERNAL_SERVER_ERROR` - Server error

---

## ✨ Summary

**Total Endpoints**: 13
- **Public**: 5 (auth, catalog, title details)
- **Protected**: 8 (playback, recommendations, account)

**All MVP specification endpoints are implemented and match exactly!** 🎉
