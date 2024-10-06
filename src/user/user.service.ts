import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private cacheService: CacheService) {}

  async createUser(userData: CreateUserDto): Promise<string> {
    const token = uuidv4();
    await this.cacheService.set(token, JSON.stringify(userData));
    return token;
  }

  async getUserByToken(token: string): Promise<CreateUserDto | undefined> {
    const userData = await this.cacheService.get(token);
    return userData ? JSON.parse(userData) : undefined;
  }

  async validateAndGetUser(token: string): Promise<CreateUserDto> {
    try {
      const userData = await this.cacheService.get(token);
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error validating token:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
