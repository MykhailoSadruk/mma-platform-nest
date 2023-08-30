import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Fighter } from '../../fighter/entities/fighter.entity';

@Entity()
export class Statistics {
    @PrimaryGeneratedColumn()
    stats_id: number;

    @Column()
    wins: number;

    @Column()
    losses: number;

    @Column()
    knockouts: number;

    @Column()
    submissions: number;

    @OneToOne(() => Fighter, fighter => fighter.statistics)
    @JoinColumn()
    fighter: Fighter;
}
