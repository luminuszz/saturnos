import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateTimerEvent } from './adpaters/inbound/events/create-timer.event';
import { TimerService } from './core/services/timer.service';
import { TimerRepositoryContract } from './core/contracts/timer-repository.contract';
import { MongoTimerRepository } from './adpaters/outbound/mongo/mongo-timer.repository';
import { LoggerContract } from './core/contracts/logger.contract';
import { PinoLoggerAdapter } from './adpaters/outbound/pino-logger.adapter';
import { MongooseModuleFactory, ConfigModuleFactory } from './config/modules';
import { Timer } from './adpaters/outbound/mongo/timer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([Timer]),
    MongooseModule.forRootAsync(MongooseModuleFactory),
    ConfigModule.forRoot(ConfigModuleFactory),
  ],

  providers: [
    {
      provide: TimerRepositoryContract,
      useClass: MongoTimerRepository,
    },
    {
      provide: LoggerContract,
      useClass: PinoLoggerAdapter,
    },
    CreateTimerEvent,
    TimerService,
  ],
})
export class AppModule {}
