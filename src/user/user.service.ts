import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: Map<string, CreateUserDto> = new Map();

  createUser(userData: CreateUserDto): string {
    const token = uuidv4();
    this.users.set(token, userData);
    return token;
  }

  getUserByToken(token: string): CreateUserDto | undefined {
    return this.users.get(token);
  }
}
