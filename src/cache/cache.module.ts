import { Module, Global } from '@nestjs/common';
import { CacheService } from './cache.service';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis(process.env.REDIS_URL);
      },
    },
    CacheService,
  ],
  exports: [CacheService],
})
export class CacheModule {}
