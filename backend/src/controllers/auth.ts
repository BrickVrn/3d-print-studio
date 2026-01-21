import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../lib/db';
import { generateTokens, verifyToken, AuthRequest } from '../middleware/auth';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const existing = await db('users').where('email', email).first();
      if (existing) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const [user] = await db('users')
        .insert({ email, password_hash: passwordHash, name })
        .returning(['id', 'email', 'name', 'role']);

      const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });

      res.status(201).json({
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        ...tokens,
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await db('users').where('email', email).first();
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });

      res.json({
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        ...tokens,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token required' });
      }

      const user = verifyToken(refreshToken);
      const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });

      res.json(tokens);
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  },

  async me(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await db('users')
        .where('id', req.user.id)
        .select('id', 'email', 'name', 'role', 'created_at')
        .first();

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async logout(_req: Request, res: Response) {
    res.json({ message: 'Logged out successfully' });
  },
};