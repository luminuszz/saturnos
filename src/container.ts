import { container } from 'tsyringe';
import { TimerRepository } from './core/contracts/timer-repository.contract';
import { Envs } from './config/envs.enum';
import { LoggerContract } from './core/contracts/logger.contract';
import { PinoLoggerAdapter } from './adpaters/outbound/pino-logger.adapter';
import { TimerService } from './core/services/timer.service';

export class MongoTimerRepository implements TimerRepository {
  create(payload: any): void {}
}

container.registerSingleton<TimerRepository>(
  TimerRepository.name,
  MongoTimerRepository,
);

container.registerInstance<LoggerContract>(
  LoggerContract.name,
  new PinoLoggerAdapter(),
);

container.registerInstance<typeof Envs>('Envs', Envs);

container.registerSingleton(TimerService.name, TimerService);
