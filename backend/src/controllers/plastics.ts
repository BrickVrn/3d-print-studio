import { Request, Response } from 'express';
import { db } from '../lib/db';
import { cache } from '../lib/cache';

export const plasticsController = {
  async getAll(req: Request, res: Response) {
    try {
      const cacheKey = 'plastics:all';
      console.log('Fetching all plastics...');
      
      const cached = await cache.get(cacheKey);
      
      if (cached) {
        console.log('Cache HIT - returning cached plastics');
        return res.json(cached);
      }

      const plastics = await db('plastics')
        .select('id', 'name', 'name_en', 'description', 'description_en', 'bed_temp', 'nozzle_temp', 'color');
      
      console.log('Cache MISS - fetching from DB, found:', plastics.length);
      
      await cache.set(cacheKey, plastics, 3600);
      res.json(plastics);
    } catch (error) {
      console.error('Get plastics error:', error);
      res.status(500).json({ error: 'Internal server error', details: String(error) });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const cacheKey = `plastics:${req.params.id}`;
      console.log('Fetching plastic:', cacheKey);

      const cached = await cache.get(cacheKey);

      if (cached) {
        console.log('Cache HIT - returning cached plastic');
        return res.json(cached);
      }

      const plastic = await db('plastics')
        .where('id', req.params.id)
        .select('id', 'name', 'name_en', 'description', 'description_en', 'bed_temp', 'nozzle_temp', 'color')
        .first();

      if (!plastic) {
        return res.status(404).json({ error: 'Plastic not found' });
      }

      console.log('Cache MISS - fetching from DB');
      await cache.set(cacheKey, plastic, 3600);
      res.json(plastic);
    } catch (error) {
      console.error('Get plastic error:', error);
      res.status(500).json({ error: 'Internal server error', details: String(error) });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, name_en, description, description_en, bed_temp, nozzle_temp, color } = req.body;

      if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
      }

      const [plastic] = await db('plastics')
        .insert({
          name,
          name_en,
          description,
          description_en,
          bed_temp,
          nozzle_temp,
          color,
        })
        .returning(['*']);

      await cache.invalidate('plastics:*');

      res.status(201).json(plastic);
    } catch (error) {
      console.error('Create plastic error:', error);
      res.status(500).json({ error: 'Internal server error', details: String(error) });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { name, name_en, description, description_en, bed_temp, nozzle_temp, color } = req.body;

      const [plastic] = await db('plastics')
        .where('id', req.params.id)
        .update({
          name,
          name_en,
          description,
          description_en,
          bed_temp,
          nozzle_temp,
          color,
          updated_at: db.fn.now(),
        })
        .returning(['*']);

      if (!plastic) {
        return res.status(404).json({ error: 'Plastic not found' });
      }

      await cache.invalidate('plastics:*');

      res.json(plastic);
    } catch (error) {
      console.error('Update plastic error:', error);
      res.status(500).json({ error: 'Internal server error', details: String(error) });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const deleted = await db('plastics').where('id', req.params.id).del();

      if (!deleted) {
        return res.status(404).json({ error: 'Plastic not found' });
      }

      await cache.invalidate('plastics:*');

      res.json({ message: 'Plastic deleted' });
    } catch (error) {
      console.error('Delete plastic error:', error);
      res.status(500).json({ error: 'Internal server error', details: String(error) });
    }
  },
};
