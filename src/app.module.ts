import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FighterModule } from './fighter/fighter.module';
import { StatisticsModule } from './statistics/statistics.module';
import { EventModule } from './event/event.module';
import { FightModule } from './fight/fight.module';
import { RankingModule } from './ranking/ranking.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    FighterModule,
    StatisticsModule,
    EventModule,
    FightModule,
    RankingModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
