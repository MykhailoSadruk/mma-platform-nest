import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,
) {}

async getAllRankings(): Promise<Ranking[]> {
    return this.rankingRepository.find();
}

async getRankingsByWeightClass(weightClass: string): Promise<Ranking[]> {
    return this.rankingRepository.find({ where: { weight_class: weightClass } });
}
}
