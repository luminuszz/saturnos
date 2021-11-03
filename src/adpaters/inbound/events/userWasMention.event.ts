import { EventPaternContract } from './contracts/event-patern.contract';
import { LoggerContract } from '../../../core/contracts/logger.contract';
import { inject, injectable } from 'tsyringe';
import { format, getTimezoneOffset } from 'date-fns-tz';
import { TimerService } from '../../../core/services/timer.service';
import { ptBR } from 'date-fns/locale';
import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from '@slack/bolt/dist/types';
import { App as BoltApp } from '@slack/bolt';
import { getUnixTime, parseISO } from 'date-fns';

type Context = SlackEventMiddlewareArgs &
  AllMiddlewareArgs & {
    event: {
      text: string;
      user: string;
      channel: string;
    };
  };

@injectable()
export class UserWasMentionEvent extends EventPaternContract {
  constructor(
    @inject('LoggerContract')
    private readonly logger: LoggerContract,

    @inject(TimerService.name)
    private readonly timerService: TimerService,

    @inject('Connector')
    private readonly connector: BoltApp,
  ) {
    super('app_mention');
  }

  private async createTimer({ event, say, client }: Context) {
    try {
      const { end_time } = await this.timerService.create({
        username: event.user,
        hours: 8,
      });

      const localDate = new Date(end_time).setHours(end_time.getHours() - 3);

      const formatedEndTime = format(localDate, 'hh:mm aa', {
        locale: ptBR,
      });

      await say(`Timer criado com sucesso !`);

      await say(`Te chamarei as ${formatedEndTime}`);

      const unix = getUnixTime(localDate);

      await client.chat.scheduleMessage({
        text: `Timer finalizado as ${formatedEndTime} `,
        channel: event.channel,
        post_at: unix,
      });
    } catch (e) {
      await say('Houve um erro');
    }
  }

  async execute(context: Context): Promise<any> {
    const [_, message] = context.event.text.split('>');

    if (this[message.trim()]) {
      await this[message.trim()](context);
    } else {
      await context.say('Invalid command');
    }
  }
}
