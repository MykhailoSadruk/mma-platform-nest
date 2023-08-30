import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Statistics } from '../../statistics/entities/statistics.entity';
import { Fight } from '../../fight/entities/fight.entity';
import { Ranking } from '../../ranking/entities/ranking.entity';

@Entity()
export class Fighter {
    @PrimaryGeneratedColumn()
    fighter_id: number;

    @Column()
    name: string;

    @Column()
    weight_class: string;

    @Column()
    nationality: string;

    @Column()
    team: string;

    @OneToOne(() => Statistics, statistics => statistics.fighter)
    statistics: Statistics;

    @OneToMany(() => Fight, fight => fight.fighter1)
    fightsAsFighter1: Fight[];

    @OneToMany(() => Fight, fight => fight.fighter2)
    fightsAsFighter2: Fight[];

    @OneToMany(() => Ranking, ranking => ranking.fighter)
    rankings: Ranking[];

    @OneToMany(() => Fight, fight => fight.winner)
    fightsWon: Fight[];
}
