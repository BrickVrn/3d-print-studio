import { Request, Response } from 'express';
import { db } from '../lib/db';

export const plasticsController = {
  async getAll(req: Request, res: Response) {
    try {
      console.log('Fetching all plastics...');
      const plastics = await db('plastics').select('*');
      console.log('Plastics found:', plastics.length);
      res.json(plastics);
    } catch (error) {
      console.error('Get plastics error:', error);
      res.status(500).json({ error: 'Internal server error', details: String(error) });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const plastic = await db('plastics').where('id', req.params.id).first();

      if (!plastic) {
        return res.status(404).json({ error: 'Plastic not found' });
      }

      res.json(plastic);
    } catch (error) {
      console.error('Get plastic error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, name_en, description, bed_temp, nozzle_temp } = req.body;

      if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
      }

      const [plastic] = await db('plastics')
        .insert({
          name,
          name_en,
          description,
          bed_temp,
          nozzle_temp,
        })
        .returning(['*']);

      res.status(201).json(plastic);
    } catch (error) {
      console.error('Create plastic error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { name, name_en, description, bed_temp, nozzle_temp } = req.body;

      const [plastic] = await db('plastics')
        .where('id', req.params.id)
        .update({
          name,
          name_en,
          description,
          bed_temp,
          nozzle_temp,
          updated_at: db.fn.now(),
        })
        .returning(['*']);

      if (!plastic) {
        return res.status(404).json({ error: 'Plastic not found' });
      }

      res.json(plastic);
    } catch (error) {
      console.error('Update plastic error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const deleted = await db('plastics').where('id', req.params.id).del();

      if (!deleted) {
        return res.status(404).json({ error: 'Plastic not found' });
      }

      res.json({ message: 'Plastic deleted' });
    } catch (error) {
      console.error('Delete plastic error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
