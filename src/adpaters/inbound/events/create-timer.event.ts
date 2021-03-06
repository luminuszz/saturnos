import { LoggerContract } from '../../../core/contracts/logger.contract';
import { format } from 'date-fns-tz';
import { TimerService } from '../../../core/services/timer.service';
import { ptBR } from 'date-fns/locale';
import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from '@slack/bolt/dist/types';
import { getUnixTime } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { EventPaternContract } from './contracts/event-patern.contract';

type Context = SlackEventMiddlewareArgs &
  AllMiddlewareArgs & {
    event: {
      text: string;
      user: string;
      channel: string;
    };
  };

@Injectable()
export class CreateTimerEvent implements EventPaternContract {
  constructor(
    private readonly logger: LoggerContract,
    private readonly timerService: TimerService,
  ) {}

  public async execute({ event, say, client }: Context) {
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
      console.log(this);

      await say('Houve um erro');
    }
  }
}
