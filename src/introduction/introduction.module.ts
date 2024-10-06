import { Module } from '@nestjs/common';
import { IntroductionService } from './introduction.service';
import { IntroductionController } from './introduction.controller';
import { WikipediaService } from 'src/wikipedia/wikipedia.service';

@Module({
  controllers: [IntroductionController],
  providers: [IntroductionService, WikipediaService],
})
export class IntroductionModule {}
