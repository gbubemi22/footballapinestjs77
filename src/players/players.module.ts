import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player, PlayerSchema } from './schema/player.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Teams, TeamSchema } from 'src/teams/schema/team.schema';
import { TeamsModule } from 'src/teams/teams.module';
import { PlayersRepository } from './repository/player.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Player.name, schema: PlayerSchema },
      { name: Teams.name, schema: TeamSchema },
    ]),
    TeamsModule,
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
})
export class PlayersModule {}
