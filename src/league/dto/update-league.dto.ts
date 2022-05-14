import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateLeagueDto } from './create-league.dto';

export class UpdateLeagueDto extends PartialType(CreateLeagueDto) {
  @IsString()
  @IsOptional()
  leaguename: string;
  @IsString()
  @IsOptional()
  location: string;
  @IsOptional()
  @IsString()
  logo: string;
}
