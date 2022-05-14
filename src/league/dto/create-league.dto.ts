import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLeagueDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  leaguename: string;
  @IsNotEmpty()
  @IsOptional()
  location: string;
  @IsOptional()
  @IsString()
  logo: string;
}
