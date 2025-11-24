import { Router, Request, Response } from 'express';
import { catalogTitles } from '../db';
import { CatalogResponse } from '../types';

const router = Router();

// GET /catalog?cursor=&pageSize=
router.get('/', (req: Request, res: Response): void => {
    try {
        const cursor = req.query.cursor as string | undefined;
        const pageSize = parseInt(req.query.pageSize as string) || 20;

        let startIndex = 0;
        if (cursor) {
            const cursorIndex = parseInt(cursor);
            if (!isNaN(cursorIndex)) {
                startIndex = cursorIndex;
            }
        }

        const endIndex = startIndex + pageSize;
        const items = catalogTitles.slice(startIndex, endIndex);
        const hasMore = endIndex < catalogTitles.length;

        const response: CatalogResponse = {
            items,
            nextCursor: hasMore ? endIndex.toString() : undefined,
        };

        res.json(response);
    } catch (error) {
        console.error('Catalog error:', error);
        res.status(500).json({
            error: {
                code: 'CATALOG_ERROR',
                message: 'Failed to fetch catalog',
            },
        });
    }
});

export default router;
