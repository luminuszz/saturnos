import { EventContract } from './Event.contract';
import { EventMessage } from '../../types';
import { EventPattern } from '../../decorators/event-partern.decorator';

@EventPattern('app_mention')
export class UserWasMentionEvent implements EventContract {
  async execute({ event }: EventMessage): Promise<any> {
    console.log({
      event,
    });

    return Promise.resolve(undefined);
  }
}
