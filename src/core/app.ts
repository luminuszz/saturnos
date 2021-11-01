import { App as BoltApp } from '@slack/bolt';
import { events } from './events';
import { container } from 'tsyringe';

export class Saturnios {
  constructor(private readonly connector: BoltApp) {
    this.registerEvents();
  }

  public static ignite(connector: BoltApp) {
    return new Saturnios(connector);
  }

  protected registerEvents() {
    this.connector.event('app_mention', async () => {
      console.log('fois');
    });

    events.forEach((event) => {
      const instance = container.resolve(event) as any;

      this.connector.event(instance.eventName, instance.execute);
    });
  }
}
