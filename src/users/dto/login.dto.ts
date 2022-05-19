/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class LoginDto {
  @IsNotEmpty()  
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
