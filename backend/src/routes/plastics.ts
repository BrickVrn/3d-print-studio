import { Router, Request, Response } from 'express';

const router = Router();

// GET / - List all plastics
router.get('/', (_req: Request, res: Response) => {
  res.json([
    { id: 'pla', name: 'PLA' },
    { id: 'petg', name: 'PETG' },
    { id: 'abs', name: 'ABS' },
    { id: 'asa', name: 'ASA' },
    { id: 'tpu', name: 'TPU' },
    { id: 'nylon', name: 'Nylon' },
  ]);
});

// GET /:id - Get plastic details
router.get('/:id', (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
});

export default router;