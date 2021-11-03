import { container } from 'tsyringe';
import { TimerRepositoryContract } from './core/contracts/timer-repository.contract';
import { Envs } from './config/envs.enum';
import { LoggerContract } from './core/contracts/logger.contract';
import { PinoLoggerAdapter } from './adpaters/outbound/pino-logger.adapter';
import { TimerService } from './core/services/timer.service';
import { MongoTimerRepository } from './adpaters/outbound/mongo/mongo-timer.repository';
import { App as BoltApp } from '@slack/bolt';

const createBoltInstance = () => {
  return new BoltApp({
    signingSecret: Envs.SLACK_SIGNING_SECRET,
    token: Envs.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: Envs.SLACK_APP_TOKEN,
  });
};

const connectInstance = createBoltInstance();

container.registerInstance<BoltApp>('Connector', connectInstance);

container.registerSingleton<TimerRepositoryContract>(
  TimerRepositoryContract.name,
  MongoTimerRepository,
);

container.registerSingleton<LoggerContract>(
  LoggerContract.name,
  PinoLoggerAdapter,
);

container.registerInstance<typeof Envs>('Envs', Envs);

container.registerSingleton(TimerService.name, TimerService);
