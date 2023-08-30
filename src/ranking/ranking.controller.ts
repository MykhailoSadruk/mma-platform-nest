import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Ranking } from './entities/ranking.entity';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  
  @Get()
  async getAllRankings(): Promise<Ranking[]> {
      return this.rankingService.getAllRankings();
  }

  @Get(':weightClass')
  async getRankingsByWeightClass(@Param('weightClass') weightClass: string): Promise<Ranking[]> {
      return this.rankingService.getRankingsByWeightClass(weightClass);
  }
}
