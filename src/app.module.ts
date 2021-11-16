import { Module } from '@nestjs/common';

import { CreateTimerEvent } from './adpaters/inbound/events/create-timer.event';
import { TimerService } from './core/services/timer.service';
import { TimerRepositoryContract } from './core/contracts/timer-repository.contract';
import { MongoTimerRepository } from './adpaters/outbound/mongo/mongo-timer.repository';
import { LoggerContract } from './core/contracts/logger.contract';
import { PinoLoggerAdapter } from './adpaters/outbound/pino-logger.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvsType } from './@types/types';

import { Timer } from './adpaters/outbound/mongo/timer.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvsType>) => ({
        uri: configService.get('MONGO_URL_CONNECT'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([Timer]),
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
