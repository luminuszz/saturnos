import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { EnvsType } from '../@types/types';

export const MongooseModuleFactory: MongooseModuleAsyncOptions = {
  useFactory: (configService: ConfigService<EnvsType>) => ({
    uri: configService.get('MONGO_URL_CONNECT'),
  }),
  inject: [ConfigService],
};

export const ConfigModuleFactory: ConfigModuleOptions = {
  isGlobal: true,
};
