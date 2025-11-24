import { Router, Request, Response } from 'express';
import { validateRequest } from '../middleware/validation';
import { signUpSchema, loginSchema, refreshTokenSchema } from '../validation/schemas';
import {
    findUserByEmail,
    createUser,
    refreshTokens,
} from '../db';
import {
    hashPassword,
    comparePassword,
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../utils/auth';
import { AuthResponse } from '../types';

const router = Router();

// POST /auth/signup
router.post(
    '/signup',
    validateRequest(signUpSchema),
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password, name } = req.body;

            // Check if user already exists
            const existingUser = findUserByEmail(email);
            if (existingUser) {
                res.status(400).json({
                    error: {
                        code: 'USER_EXISTS',
                        message: 'User with this email already exists',
                    },
                });
                return;
            }

            // Hash password
            const hashedPassword = await hashPassword(password);

            // Create user
            const user = createUser(email, hashedPassword, name || email.split('@')[0]);

            // Generate tokens
            const jwt = generateAccessToken(user.id, user.email);
            const refreshToken = generateRefreshToken(user.id, user.email);
            refreshTokens.add(refreshToken);

            const response: AuthResponse = {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                jwt,
                refreshToken,
            };

            res.status(201).json(response);
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({
                error: {
                    code: 'SIGNUP_FAILED',
                    message: 'Failed to create user',
                },
            });
        }
    }
);

// POST /auth/login
router.post(
    '/login',
    validateRequest(loginSchema),
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            // Find user
            const user = findUserByEmail(email);
            if (!user) {
                res.status(401).json({
                    error: {
                        code: 'INVALID_CREDENTIALS',
                        message: 'Invalid email or password',
                    },
                });
                return;
            }

            // Verify password
            const isValidPassword = await comparePassword(password, user.password);
            if (!isValidPassword) {
                res.status(401).json({
                    error: {
                        code: 'INVALID_CREDENTIALS',
                        message: 'Invalid email or password',
                    },
                });
                return;
            }

            // Generate tokens
            const jwt = generateAccessToken(user.id, user.email);
            const refreshToken = generateRefreshToken(user.id, user.email);
            refreshTokens.add(refreshToken);

            const response: AuthResponse = {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                jwt,
                refreshToken,
            };

            res.json(response);
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                error: {
                    code: 'LOGIN_FAILED',
                    message: 'Failed to login',
                },
            });
        }
    }
);

// POST /auth/refresh
router.post(
    '/refresh',
    validateRequest(refreshTokenSchema),
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                res.status(401).json({
                    error: {
                        code: 'REFRESH_TOKEN_REQUIRED',
                        message: 'Refresh token is required',
                    },
                });
                return;
            }

            // Check if refresh token exists
            if (!refreshTokens.has(refreshToken)) {
                res.status(401).json({
                    error: {
                        code: 'INVALID_REFRESH_TOKEN',
                        message: 'Invalid refresh token',
                    },
                });
                return;
            }

            // Verify refresh token
            const decoded = verifyRefreshToken(refreshToken);

            // Generate new access token
            const jwt = generateAccessToken(decoded.id, decoded.email);

            res.json({ jwt });
        } catch (error) {
            console.error('Refresh token error:', error);
            res.status(401).json({
                error: {
                    code: 'REFRESH_FAILED',
                    message: 'Failed to refresh token',
                },
            });
        }
    }
);

// POST /auth/logout
router.post('/logout', (req: Request, res: Response): void => {
    const { refreshToken } = req.body;

    if (refreshToken) {
        refreshTokens.delete(refreshToken);
    }

    res.status(204).send();
});

export default router;
