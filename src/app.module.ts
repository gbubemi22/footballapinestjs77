import { LeagueModule } from './league/league.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
//import { AppService } from './app.service';
//import { AppController } from './app.controller';
//import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';
import { LeagueService } from './league/league.service';

@Module({
  imports: [
    LeagueModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    TeamsModule,
    PlayersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
