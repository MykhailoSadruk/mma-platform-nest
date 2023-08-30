import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from '../../fight/entities/fight.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    event_id: number;

    @Column()
    location: string;

    @Column()
    date: Date;

    @OneToMany(() => Fight, fight => fight.event)
    fights: Fight[];
}
