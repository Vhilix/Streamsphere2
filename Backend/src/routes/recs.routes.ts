import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { catalogTitles } from '../db';
import { RecommendationsResponse } from '../types';

const router = Router();

// GET /recs/home
router.get('/home', authenticateToken, (req: Request, res: Response): void => {
    try {
        // In production, this would use a recommendation algorithm
        // For MVP, return random titles with scores
        const randomTitles = getRandomTitles(10);

        const response: RecommendationsResponse = {
            items: randomTitles.map((title, index) => ({
                titleId: title.id,
                score: 0.95 - index * 0.05,
            })),
        };

        res.json(response);
    } catch (error) {
        console.error('Home recommendations error:', error);
        res.status(500).json({
            error: {
                code: 'RECS_ERROR',
                message: 'Failed to fetch recommendations',
            },
        });
    }
});

// GET /recs/for/:titleId
router.get('/for/:titleId', authenticateToken, (req: Request, res: Response): void => {
    try {
        const { titleId } = req.params;

        // In production, this would use collaborative filtering or content-based recommendations
        // For MVP, return random similar titles
        const randomTitles = getRandomTitles(8);

        const response: RecommendationsResponse = {
            items: randomTitles.map((title, index) => ({
                titleId: title.id,
                score: 0.9 - index * 0.05,
            })),
        };

        res.json(response);
    } catch (error) {
        console.error('Title recommendations error:', error);
        res.status(500).json({
            error: {
                code: 'RECS_ERROR',
                message: 'Failed to fetch recommendations',
            },
        });
    }
});

// Helper function to get random titles
function getRandomTitles(count: number) {
    const shuffled = [...catalogTitles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export default router;
