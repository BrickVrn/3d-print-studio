import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: 3,
});

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const cached = await redisClient.get(key);
    if (cached) {
      return JSON.parse(cached) as T;
    }
    return null;
  },

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    await redisClient.setex(key, ttl, JSON.stringify(value));
  },

  async del(key: string): Promise<void> {
    await redisClient.del(key);
  },

  async invalidate(pattern: string): Promise<void> {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  },

  async disconnect(): Promise<void> {
    await redisClient.quit();
  },
};
