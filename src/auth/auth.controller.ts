import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/users/dto/login.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() user: UserDto) {
    return this.userService.register(user);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.userService.login(user);
  }

  @Post('logout')
  async logout() {
    return {
      message: 'Logout successfully',
    };
  }
}
