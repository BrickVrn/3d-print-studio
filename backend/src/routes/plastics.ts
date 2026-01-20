import { Router, Request, Response } from 'express';
import { db } from '../lib/db.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const plastics = await db('plastics').select('*');
    res.json(plastics);
  } catch (error) {
    console.error('Error fetching plastics:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const plastic = await db('plastics')
      .where('id', req.params.id)
      .first();
    
    if (!plastic) {
      return res.status(404).json({ error: 'Plastic not found' });
    }
    
    res.json(plastic);
  } catch (error) {
    console.error('Error fetching plastic:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;