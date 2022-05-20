import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';
import { LoginDto } from 'src/users/dto/login.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/schema/user.schema';
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

  @Get('currentUser')
  @UseGuards(LocalAuthenticationGuard)
  async currentUser(@CurrentUser() user: User) {
    return user;
  }
}
