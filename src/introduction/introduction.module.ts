import { Module } from '@nestjs/common';
import { IntroductionService } from './introduction.service';
import { IntroductionController } from './introduction.controller';
import { WikipediaService } from 'src/wikipedia/wikipedia.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [IntroductionController],
  providers: [IntroductionService, WikipediaService, UserService],
})
export class IntroductionModule {}
