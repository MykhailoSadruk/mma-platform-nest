import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics])],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
