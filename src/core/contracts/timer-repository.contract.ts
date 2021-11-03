import { TimerEntity } from '../entities/timer.entity';

export type CreateTimer = {
  username: string;
  end_time: Date;
  start_time: Date;
};

export type Query = Record<keyof TimerEntity, any>;

export abstract class TimerRepositoryContract {
  abstract create(args: CreateTimer): Promise<TimerEntity>;

  abstract findOne(query: Partial<Query>): Promise<TimerEntity | undefined>;
}
