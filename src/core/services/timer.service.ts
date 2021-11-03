import { inject, injectable } from 'tsyringe';
import { addHours, addMinutes } from 'date-fns';
import { TimerRepositoryContract } from '../contracts/timer-repository.contract';

type CreateTimerDTO = {
  username: string;
  hours: number;
};

@injectable()
export class TimerService {
  constructor(
    @inject(TimerRepositoryContract.name)
    private readonly timerRepository: TimerRepositoryContract,
  ) {}

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

  async findTimerByUserName(username: string) {
    return this.timerRepository.findOne({
      username,
    });
  }

  async findTimersInThisDateByUserName(username: string, date: Date) {}
}
