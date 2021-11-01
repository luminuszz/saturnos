import { Middleware, SlackEventMiddlewareArgs } from '@slack/bolt/dist/types';
import { Envs } from './config/envs.enum';

declare type EnvsType = typeof Envs;

declare type EventMessage = {
  event: Object;
};
