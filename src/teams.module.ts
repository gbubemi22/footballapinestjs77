/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueModule } from 'src/league/league.module';
import { League, LeagueSchema } from 'src/league/schema/league.schema';
import { Teams, TeamSchema } from './schema/team.schema';
import { TeamsRepository } from './repository/repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Teams.name,

        useFactory: () => {
          const schema = TeamSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          schema.plugin(require('mongoose-slug-generator'));
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([
      {
        name: League.name,
        schema: LeagueSchema,
      },
    ]),
    LeagueModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
})
export class TeamsModule {}
