import { z } from 'zod';

export const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().optional(),
});

export const updateProfileSchema = z.object({
    name: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

export const playbackStartSchema = z.object({
    titleId: z.string().min(1, 'Title ID is required'),
});

export const heartbeatSchema = z.object({
    titleId: z.string().min(1, 'Title ID is required'),
    positionSec: z.number().min(0, 'Position must be non-negative'),
    bitrateKbps: z.number().optional(),
});
