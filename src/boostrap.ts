import { container, inject, injectable } from 'tsyringe';
import { EnvsType } from './@types/types';
import { events } from './adpaters/inbound/events';

import { App as BoltApp } from '@slack/bolt';
import { EventPaternContract } from './adpaters/inbound/events/contracts/event-patern.contract';

@injectable()
export class Bootstrap {
  constructor(
    @inject('Envs')
    private readonly environment: EnvsType,
  ) {}

  private createBoltInstance() {
    return new BoltApp({
      signingSecret: this.environment.SLACK_SIGNING_SECRET,
      token: this.environment.SLACK_BOT_TOKEN,
      socketMode: true,
      appToken: this.environment.SLACK_APP_TOKEN,
    });
  }

  public async run(port: number = 3000) {
    const bolt = this.createBoltInstance();

    this.registerEvents(bolt);
    this.registerMongoConnection();

    await bolt.start(port);

    console.log('App is run');
  }

  private registerEvents(connector: BoltApp) {
    events.forEach(async (event) => {
      const instance = container.resolve<any>(
        event,
      ) as unknown as EventPaternContract;

      await connector.event(
        instance.eventName,
        instance.execute.bind(instance),
      );
    });
  }

  private registerMongoConnection() {}
}
