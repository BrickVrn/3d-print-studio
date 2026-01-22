import { Request, Response, NextFunction } from 'express';
import { cache } from '../lib/cache';

interface CachedRequest extends Request {
  cacheKey?: string;
}

const DEFAULT_TTL = 3600;

export function cacheMiddleware(ttl: number = DEFAULT_TTL) {
  return async (req: CachedRequest, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = `cache:${req.originalUrl}`;

    try {
      const cached = await cache.get(cacheKey);

      if (cached) {
        console.log(`Cache HIT: ${cacheKey}`);
        res.setHeader('X-Cache', 'HIT');
        res.setHeader('Content-Type', 'application/json');
        return res.send(cached);
      }

      console.log(`Cache MISS: ${cacheKey}`);
      res.setHeader('X-Cache', 'MISS');

      const originalSend = res.send.bind(res);

      res.send = (data: any) => {
        if (res.statusCode === 200) {
          cache.set(cacheKey, data, ttl);
        }
        originalSend(data);
      };
    } catch (error) {
      console.error('Cache error:', error);
    }

    next();
  };
}

export function clearCache(pattern: string) {
  return async () => {
    await cache.invalidate(pattern);
  };
}
