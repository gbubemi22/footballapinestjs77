/* eslint-disable @typescript-eslint/no-var-requires */

import { LeagueModule } from '../league/league.module';
import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { League, LeagueSchema } from '../league/schema/league.schema';
import { Teams, TeamSchema } from './schema/team.schema';
import { TeamsRepository } from './repository/repository';

@Module({
  imports: [
    LeagueModule,
    MongooseModule.forFeature([
      {
        name: Teams.name,
        schema: TeamSchema,
      },
      { name: League.name, schema: LeagueSchema },
    ]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
})
export class TeamsModule {}
