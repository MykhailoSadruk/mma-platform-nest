import { Get, Injectable, Param } from '@nestjs/common';
import { Statistics } from './entities/statistics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private statisticsRepository: Repository<Statistics>,
  ) {}

  async getByFighterId(fighterId: number): Promise<Statistics | undefined> {
    return this.statisticsRepository.findOne({
      where: { fighter: { fighter_id: fighterId } },
    });
  }

  async getAllStatistics(): Promise<Statistics[]> {
    return this.statisticsRepository.find();
  }
}
