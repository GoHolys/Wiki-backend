import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    try {
      const token = await this.userService.createUser(createUserDto);
      return { token };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get()
  async getUser(@Headers('x-authentication') authToken: string) {
    if (!authToken) {
      throw new UnauthorizedException('Authentication token is required');
    }

    try {
      const user = await this.userService.getUserByToken(authToken);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return {
        message: `user: ${user.userName} language: ${user.language}.`,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Error getting user:', error);
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }
}
