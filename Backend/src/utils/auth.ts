import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (userId: string, email: string): string => {
    return jwt.sign({ id: userId, email }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
};

export const generateRefreshToken = (userId: string, email: string): string => {
    return jwt.sign({ id: userId, email }, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiresIn,
    });
};

export const verifyRefreshToken = (token: string): { id: string; email: string } => {
    return jwt.verify(token, config.jwt.refreshSecret) as { id: string; email: string };
};
