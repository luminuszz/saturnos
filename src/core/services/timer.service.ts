import { addHours } from 'date-fns';
import { TimerRepositoryContract } from '../contracts/timer-repository.contract';
import { Injectable } from '@nestjs/common';

type CreateTimerDTO = {
  username: string;
  hours: number;
};

@Injectable()
export class TimerService {
  constructor(private readonly timerRepository: TimerRepositoryContract) {}

  async create({ username, hours }: CreateTimerDTO) {
    const now = new Date();

    const endTime = addHours(now, hours);

    console.log({ endTime, now });

    return this.timerRepository.create({
      username: username,
      start_time: now,
      end_time: endTime,
    });
  }
}
