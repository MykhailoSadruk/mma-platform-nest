import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Fighter } from '../../fighter/entities/fighter.entity';

@Entity()
export class Ranking {
    @PrimaryGeneratedColumn()
    ranking_id: number;

    @Column()
    weight_class: string;

    @ManyToOne(() => Fighter, fighter => fighter.rankings)
    @JoinColumn({ name: 'fighter_id' })
    fighter: Fighter;

    @Column()
    rank: number;
}
