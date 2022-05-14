import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueSchema } from './schema/league.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema }]),
  ],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
