import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';

interface CachedResponse {
  introduction: string;
  timestamp: number;
}

@Injectable()
export class WikipediaService {
  constructor(private cacheService: CacheService) {}

  async getWikipediaEntry(
    articleName: string,
    language: string,
  ): Promise<string> {
    const cacheKey = `wikipedia:${language}:${articleName}`;
    const cachedData = await this.cacheService.get(cacheKey);

    if (cachedData) {
      const parsedData: CachedResponse = JSON.parse(cachedData);
      return parsedData.introduction;
    }

    try {
      const response = await axios.get(
        `https://${language}.wikipedia.org/w/api.php`,
        {
          params: {
            action: 'query',
            format: 'json',
            prop: 'extracts',
            exintro: 'true',
            explaintext: 'true',
            titles: articleName,
          },
        },
      );

      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const extract = pages[pageId].extract;

      if (!extract) {
        throw new NotFoundException(
          `Article '${articleName}' not found in ${language} Wikipedia`,
        );
      }

      const introduction = extract.split('\n')[0];

      // Cache the result
      await this.cacheService.set(
        cacheKey,
        JSON.stringify({
          introduction,
          timestamp: Date.now(),
        }),
      );

      return introduction;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to fetch article from ${language} Wikipedia`,
      );
    }
  }
}
