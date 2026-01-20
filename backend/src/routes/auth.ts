import { Router, Request, Response } from 'express';

const router = Router();

// POST /register
router.post('/register', (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
});

// POST /login
router.post('/login', (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
});

// POST /refresh
router.post('/refresh', (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
});

// POST /logout
router.post('/logout', (_req: Request, res: Response) => {
  res.json({ message: 'Logged out' });
});

export default router;