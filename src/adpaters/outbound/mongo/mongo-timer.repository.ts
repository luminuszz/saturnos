import {
  CreateTimer,
  Query,
  TimerRepositoryContract,
} from '../../../core/contracts/timer-repository.contract';
import { TimerEntity } from '../../../core/entities/timer.entity';
import * as mongoose from 'mongoose';
import { TimerDocument, timerSchema } from './timer.schema';
import * as Mongoose from 'mongoose';

export class MongoTimerRepository implements TimerRepositoryContract {
  private readonly TimerModel: Mongoose.Model<TimerDocument> = mongoose.model(
    'Timer',
    timerSchema,
  );

  async create(args: CreateTimer): Promise<TimerEntity> {
    console.log('bateu aqui');

    return this.TimerModel.create({
      username: args.username,
      end_time: args.end_time,
      start_time: args.start_time,
    });
  }

  async findOne(query: Query): Promise<TimerEntity> {
    return this.TimerModel.findOne({
      ...query,
    }).exec();
  }
}
