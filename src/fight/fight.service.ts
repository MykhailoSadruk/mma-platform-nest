import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Fight } from './entities/fight.entity';
import { Fighter } from '../fighter/entities/fighter.entity';
import { Ranking } from '../ranking/entities/ranking.entity';

@Injectable()
export class FightService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
  ) {}

  async create(createFightDto: CreateFightDto) {
    const newFight = this.fightRepository.create(createFightDto);
    await this.fightRepository.save(newFight);
    return newFight;
  }

  async findAll() {
    return this.fightRepository.find();
  }

  async findOne(id: number) {
    const fight = await this.fightRepository.findOne({
      where: { fight_id: id },
    });
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    return fight;
  }

  async update(id: number, updateFightDto: UpdateFightDto) {
    const fight = await this.findOne(id);
    this.fightRepository.merge(fight, updateFightDto);
    return this.fightRepository.save(fight);
  }

  async remove(id: number) {
    const fight = await this.findOne(id);
    await this.fightRepository.remove(fight);
    return { message: `Fight with ID ${id} has been removed` };
  }

  async processFightResults(fight: Fight) {
    const winner = fight.winner;
    const weightClass = winner.weight_class;

    await this.updateRankings(winner, weightClass);
  }

  private async updateRankings(winner: Fighter, weightClass: string) {
    const rankingRepository = this.entityManager.getRepository(Ranking);

    const weightClassRankings = await rankingRepository.find({
      where: { weight_class: weightClass },
      order: { rank: 'ASC' },
    });

    const updatedRankings = weightClassRankings.map((ranking, index) => {
      if (ranking.fighter.fighter_id === winner.fighter_id) {
        ranking.rank = index + 1;
      } else if (ranking.rank > weightClassRankings.length) {
        ranking.rank = weightClassRankings.length + 1;
      } else {
        ranking.rank = index + 2;
      }
      return ranking;
    });

    await rankingRepository.save(updatedRankings);
  }
}
