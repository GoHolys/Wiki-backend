import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): { token: string } {
    const token = this.userService.createUser(createUserDto);
    return { token };
  }

  @Get()
  getUser(@Headers('x-authentication') authToken: string) {
    if (!authToken) {
      throw new UnauthorizedException('Authentication token is required');
    }

    const user = this.userService.getUserByToken(authToken);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      message: `user: ${user.userName} language: ${user.language}.`,
    };
  }
}
