import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
  ) {}
  async create(createFighterDto: CreateFighterDto) {
    const newFighter = this.fighterRepository.create(createFighterDto);
    await this.fighterRepository.save(newFighter);
    return newFighter;
  }

  async findAll() {
    return this.fighterRepository.find();
  }


  async findOne(id: number) {
    const fighter = await this.fighterRepository.findOne({
      where: { fighter_id: id },
    });
    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }
    return fighter;
  }

  async update(id: number, updateFighterDto: UpdateFighterDto) {
    const fighter = await this.findOne(id);
    this.fighterRepository.merge(fighter, updateFighterDto);
    return this.fighterRepository.save(fighter);
  }

  async remove(id: number) {
    const fighter = await this.findOne(id);
    await this.fighterRepository.remove(fighter);
    return { message: `Fighter with ID ${id} has been removed` };
  }

  async getFightStatistics(fighterId: number) {
    const fighter = await this.fighterRepository.findOne({
      where: { fighter_id: fighterId },
      relations: ['statistics', 'fightsAsFighter1', 'fightsAsFighter2'],
    });

    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${fighterId} not found`);
    }

    const totalFights =
      fighter.fightsAsFighter1.length + fighter.fightsAsFighter2.length;
    const wins =
      fighter.fightsAsFighter1.filter(
        (fight) => fight.winner.fighter_id === fighterId,
      ).length +
      fighter.fightsAsFighter2.filter(
        (fight) => fight.winner.fighter_id === fighterId,
      ).length;

    const submissions = fighter.statistics.submissions;
    const knockouts = fighter.statistics.knockouts;

    return {
      fighter_id: fighter.fighter_id,
      name: fighter.name,
      total_fights: totalFights,
      wins: wins,
      submissions: submissions,
      knockouts: knockouts,
    };
  }
}
