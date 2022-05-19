import { IsNotEmpty, IsString, IsInt, IsMongoId } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  playername: string;
  @IsNotEmpty()
  @IsString()
  position: string;
  @IsNotEmpty()
  @IsString()
  nationality: string;
  @IsInt()
  @IsNotEmpty()
  number: number;
  isCaptain?: boolean = false;

  @IsMongoId()
  team: string;
}
