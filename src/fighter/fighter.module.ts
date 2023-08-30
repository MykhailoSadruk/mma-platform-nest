import { Module } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { FighterController } from './fighter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  controllers: [FighterController],
  providers: [FighterService]
})
export class FighterModule {}
