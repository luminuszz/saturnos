import { EventPaternContract } from './contracts/event-patern.contract';
import { LoggerContract } from '../../../core/contracts/logger.contract';
import { inject, injectable } from 'tsyringe';
import { TimerService } from '../../../core/services/timer.service';

type EventPayload = {
  event: any;
};

@injectable()
export class UserWasMentionEvent extends EventPaternContract {
  constructor(
    @inject('LoggerContract')
    private readonly logger: LoggerContract,

    @inject(TimerService.name)
    private readonly timerService: TimerService,
  ) {
    super('app_mention');
  }

  async execute({ event }: EventPayload): Promise<any> {
    this.logger.log('hello gauys');

    await this.timerService.create();
  }
}
