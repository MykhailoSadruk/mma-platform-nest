import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Fighter } from '../../fighter/entities/fighter.entity';
import { Event } from '../../event/entities/event.entity';


@Entity()
export class Fight {
    @PrimaryGeneratedColumn()
    fight_id: number;

    @ManyToOne(() => Event, event => event.fights)
    @JoinColumn({ name: 'event_id' })
    event: Event;

    @ManyToOne(() => Fighter, fighter => fighter.fightsAsFighter1)
    @JoinColumn({ name: 'fighter1' })
    fighter1: Fighter;

    @ManyToOne(() => Fighter, fighter => fighter.fightsAsFighter2)
    @JoinColumn({ name: 'fighter2' })
    fighter2: Fighter;


    @ManyToOne(() => Fighter, fighter => fighter.fightsWon)
    @JoinColumn({ name: 'winner_id' })
    winner: Fighter;
}
