import { EventMessage } from '../../types';

export abstract class EventContract {
  abstract execute(payload: EventMessage): Promise<any>;
}
