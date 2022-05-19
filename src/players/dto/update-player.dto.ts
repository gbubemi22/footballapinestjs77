import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsMongoId } from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsOptional()
  playername: string;
  @IsOptional()
  position: string;
  @IsOptional()
  nationality: string;
  @IsOptional()
  number: number;
  @IsOptional()
  isCaptain: boolean;
  @IsOptional()
  @IsMongoId()
  team: string;
}
