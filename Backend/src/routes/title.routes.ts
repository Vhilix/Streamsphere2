import { Router, Request, Response } from 'express';
import { titleDetailsMap } from '../db';
import { TitleDetails } from '../types';

const router = Router();

// GET /titles/:id
router.get('/:id', (req: Request, res: Response): void => {
    try {
        const { id } = req.params;

        const title = titleDetailsMap.get(id);
        if (!title) {
            res.status(404).json({
                error: {
                    code: 'TITLE_NOT_FOUND',
                    message: `Title with ID ${id} not found`,
                },
            });
            return;
        }

        res.json(title);
    } catch (error) {
        console.error('Title error:', error);
        res.status(500).json({
            error: {
                code: 'TITLE_ERROR',
                message: 'Failed to fetch title details',
            },
        });
    }
});

export default router;
