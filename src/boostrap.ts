import { container, inject, injectable } from 'tsyringe';
import * as mongoose from 'mongoose';
import { EnvsType } from './@types/types';
import { events } from './adpaters/inbound/events';

import { App as BoltApp } from '@slack/bolt';
import { EventPaternContract } from './adpaters/inbound/events/contracts/event-patern.contract';

@injectable()
export class Bootstrap {
  constructor(
    @inject('Envs')
    private readonly environment: EnvsType,

    @inject('Connector')
    private readonly connector: BoltApp,
  ) {}

  public async run(port: number = 3000) {
    await this.registerMongoConnection();
    this.registerEvents();

    await this.connector.start(port);

    console.log('App is run');
  }

  private registerEvents() {
    events.forEach(async (event) => {
      const instance = container.resolve<any>(
        event,
      ) as unknown as EventPaternContract;

      await this.connector.event(
        instance.eventName,
        instance.execute.bind(instance),
      );
    });
  }

  private async registerMongoConnection() {
    await mongoose.connect(this.environment.MONGO_URL_CONNECT);
  }
}
