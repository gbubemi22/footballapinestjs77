import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<any> {
    return await this.userService.findOne(username);
  }

  async login(username: any, password: any): Promise<any> {
    const payload = {
      username: username.username,
      password: password.password,
      sub: username.userId,
      role: username.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
