import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntroductionModule } from './introduction/introduction.module';
import { UserModule } from './user/user.module';
import { WikipediaModule } from './wikipedia/wikipedia.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [WikipediaModule, IntroductionModule, UserModule, CacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
