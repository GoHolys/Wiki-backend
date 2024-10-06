import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  async set(key: string, value: string, ttl: number = 300): Promise<void> {
    await this.redis.set(key, value, 'EX', ttl);
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async has(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }
}
