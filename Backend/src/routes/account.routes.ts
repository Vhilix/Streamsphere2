import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { updateProfileSchema } from '../validation/schemas';
import { findUserById, updateUser } from '../db';
import { hashPassword } from '../utils/auth';

const router = Router();

// GET /me
router.get('/', authenticateToken, (req: AuthRequest, res: Response): void => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'User not authenticated',
                },
            });
            return;
        }

        const user = findUserById(userId);
        if (!user) {
            res.status(404).json({
                error: {
                    code: 'USER_NOT_FOUND',
                    message: 'User not found',
                },
            });
            return;
        }

        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            error: {
                code: 'PROFILE_ERROR',
                message: 'Failed to fetch profile',
            },
        });
    }
});

// PATCH /me
router.patch(
    '/',
    authenticateToken,
    validateRequest(updateProfileSchema),
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    error: {
                        code: 'UNAUTHORIZED',
                        message: 'User not authenticated',
                    },
                });
                return;
            }

            const { name, password } = req.body;
            const updates: any = {};

            if (name) {
                updates.name = name;
            }

            if (password) {
                updates.password = await hashPassword(password);
            }

            const updatedUser = updateUser(userId, updates);
            if (!updatedUser) {
                res.status(404).json({
                    error: {
                        code: 'USER_NOT_FOUND',
                        message: 'User not found',
                    },
                });
                return;
            }

            res.json({
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
            });
        } catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({
                error: {
                    code: 'UPDATE_ERROR',
                    message: 'Failed to update profile',
                },
            });
        }
    }
);

export default router;
