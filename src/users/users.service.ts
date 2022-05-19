import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserTokenDto } from './dto/usertoken.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createDTO: UserDto): Promise<any> {
    const user = new this.userModel();
    user.password = await bcrypt.hash(createDTO.password, 10);
    return await user.save();
  }

  async findOne(username: string): Promise<any> {
    const user: User = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async login(loginDTO: LoginDto): Promise<UserTokenDto> {
    const user: User = await this.userModel
      .findOne({ username: loginDTO.username })
      .select('+password')
      .exec();
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const userDTO = new UserTokenDto();
    const token = this._createToken(loginDTO);
    userDTO.username = user.username;
    userDTO.token = token;
    return userDTO;
  }

  private _createToken({ username }: LoginDto): any {
    const user: any = { username };
    const accessToken = this.jwtService.sign(user);

    return {
      expiration: process.env.SECT_EXPIRATION,
      accessToken,
    };
  }
}
