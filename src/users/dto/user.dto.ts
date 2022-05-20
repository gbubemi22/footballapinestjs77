/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNumberString, IsEnum, IsIn, ValidateIf } from 'class-validator';
import { Role } from '../user.enum';

export class UserDto {
  @IsString()
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsNumberString()
  phonenumber: number;
  @IsString()
  password: string;
  @IsString()
  @IsEnum(Role)
  @ValidateIf((r) => typeof r.role !== 'undefined')
  @IsIn(Object.values(Role))
  roles: Role[];
}
