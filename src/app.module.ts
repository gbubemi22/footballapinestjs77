import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeagueModule } from './league/league.module';
import { TeamsModule } from './teams/teams.module';
//import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    LeagueModule,
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
