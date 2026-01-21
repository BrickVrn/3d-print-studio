import { Request, Response } from 'express';
import { db } from '../lib/db';
import { AuthRequest } from '../middleware/auth';

export const ordersController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const { client_name, client_email, client_phone, description, file_urls } = req.body;

      if (!client_name || !client_email || !description) {
        return res.status(400).json({ error: 'Name, email, and description are required' });
      }

      const [order] = await db('orders')
        .insert({
          client_name,
          client_email,
          client_phone,
          description,
          file_urls: JSON.stringify(file_urls || []),
        })
        .returning(['*']);

      res.status(201).json(order);
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAll(req: AuthRequest, res: Response) {
    try {
      const orders = await db('orders')
        .orderBy('created_at', 'desc')
        .select('*');

      res.json(orders);
    } catch (error) {
      console.error('Get orders error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getOne(req: AuthRequest, res: Response) {
    try {
      const order = await db('orders')
        .where('id', req.params.id)
        .first();

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      console.error('Get order error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const { status } = req.body;
      const validStatuses = ['new', 'in_progress', 'completed', 'cancelled'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const [order] = await db('orders')
        .where('id', req.params.id)
        .update({ status, updated_at: db.fn.now() })
        .returning(['*']);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      console.error('Update order error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const deleted = await db('orders')
        .where('id', req.params.id)
        .del();

      if (!deleted) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ message: 'Order deleted' });
    } catch (error) {
      console.error('Delete order error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};