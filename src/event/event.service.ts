import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(newEvent);
    return newEvent;
  }

  async findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne({
      where: { event_id: id },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    this.eventRepository.merge(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
    return { message: `Event with ID ${id} has been removed` };
  }

  async getUpcomingEvents() {
    const currentDate = new Date();

    const upcomingEvents = await this.eventRepository.find({
      where: {
        date: MoreThan(currentDate),
      },
      order: {
        date: 'ASC',
      },
    });

    return upcomingEvents;
  }
}
