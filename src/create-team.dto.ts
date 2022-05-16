import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  team: string;
  @IsNotEmpty()
  nickname: string;
  @IsNotEmpty()
  @IsMongoId()
  league: any;
}
