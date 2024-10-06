import { IsString, IsNumber, Matches } from 'class-validator';
import { ARTICLE_NAME_REGEX } from 'src/config/constants';

export class IntroductionParamDto {
  @IsString()
  @Matches(ARTICLE_NAME_REGEX, {
    message:
      'Article name can only contain letters, numbers, hyphens, and underscores',
  })
  articleName: string;
}

export class IntroductionResponseDto {
  @IsNumber()
  scrapeDate: number;

  @IsString()
  articleName: string;

  @IsString()
  introduction: string;

  @IsString()
  language: string;
}
