/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNumberString, IsEnum, IsIn, ValidateIf } from 'class-validator';
import { UserRole } from '../user.enum';

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
  @IsEnum(UserRole)
  @ValidateIf((r) => typeof r.role !== 'undefined')
  @IsIn(Object.values(UserRole))
  role: UserRole;
}
