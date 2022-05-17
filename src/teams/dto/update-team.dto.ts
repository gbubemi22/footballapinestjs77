import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsOptional } from 'class-validator';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsOptional()
  team: string;
  @IsOptional()
  nickname: string;
  @IsMongoId()
  @IsOptional()
  league: string;
}
