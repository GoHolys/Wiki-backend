import { Controller, Get, Headers, Param } from '@nestjs/common';
import {
  IntroductionParamDto,
  IntroductionResponseDto,
} from './dto/introduction.dto';
import { IntroductionService } from './introduction.service';

@Controller('introduction')
export class IntroductionController {
  constructor(private readonly introductionService: IntroductionService) {}

  @Get(':articleName')
  async getIntroduction(
    @Param() params: IntroductionParamDto,
    @Headers('Accept-Language') language,
  ): Promise<IntroductionResponseDto> {
    return await this.introductionService.getIntroduction(
      params.articleName,
      language || 'en',
    );
  }
}
