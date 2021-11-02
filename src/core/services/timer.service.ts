import { inject, injectable } from 'tsyringe';
import { TimerRepository } from '../contracts/timer-repository.contract';

@injectable()
export class TimerService {
  constructor(
    @inject(TimerRepository.name)
    private readonly timerRepository: TimerRepository,
  ) {}

  async create() {}
}
