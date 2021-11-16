import { CreateTimer, Query, TimerRepositoryContract } from '../../../core/contracts/timer-repository.contract';
import { TimerEntity } from '../../../core/entities/timer.entity';
import { Timer, TimerDocument } from './timer.schema';
import Mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongoTimerRepository implements TimerRepositoryContract {
  constructor(
    @InjectModel(Timer.name)
    private readonly timerModel: Mongoose.Model<TimerDocument>,
  ) {}

  async create(args: CreateTimer): Promise<TimerEntity> {
    console.log('bateu aqui');

    return this.timerModel.create({
      username: args.username,
      end_time: args.end_time,
      start_time: args.start_time,
    });
  }

  async findOne(query: Query): Promise<TimerEntity> {
    return this.timerModel
      .findOne({
        ...query,
      })
      .exec();
  }
}
