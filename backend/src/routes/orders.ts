import { Router, Request, Response } from 'express';

const router = Router();

// POST / - Create order
router.post('/', (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
});

// GET / - List orders (admin)
router.get('/', (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
});

// GET /:id - Get order details
router.get('/:id', (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
});

// PATCH /:id - Update order status
router.patch('/:id', (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
});

export default router;