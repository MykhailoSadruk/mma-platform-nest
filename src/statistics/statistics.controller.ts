import { Controller, Get, Param } from '@nestjs/common';
import { Statistics } from './entities/statistics.entity';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('fighter/:fighterId')
  async getByFighterId(
    @Param('fighterId') fighterId: number,
  ): Promise<Statistics | undefined> {
    return this.statisticsService.getByFighterId(fighterId);
  }

  @Get()
  async getAllStatistics(): Promise<Statistics[]> {
    return this.statisticsService.getAllStatistics();
  }
}
