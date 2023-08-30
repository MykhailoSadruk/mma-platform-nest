import { Module } from '@nestjs/common';
import { FightService } from './fight.service';
import { FightController } from './fight.controller';
import { Fight } from './entities/fight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fight])],
  controllers: [FightController],
  providers: [FightService]
})
export class FightModule {}
