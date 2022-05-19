/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserTokenDto } from 'src/users/dto/usertoken.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'username',
    });
  }
  async validate(username: string, password: string): Promise<UserTokenDto> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.validatePassword(password)) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
