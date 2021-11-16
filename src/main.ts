import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { App as BoltApp } from '@slack/bolt';
import { Envs } from './config/envs.enum';
import { CreateTimerEvent } from './adpaters/inbound/events/create-timer.event';

(async () => {
  const bolt = new BoltApp({
    signingSecret: Envs.SLACK_SIGNING_SECRET,
    token: Envs.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: Envs.SLACK_APP_TOKEN,
  });

  const nestApp = await NestFactory.createApplicationContext(AppModule);

  const createTimerService = nestApp.get(CreateTimerEvent);

  await bolt.event(
    'app_mention',
    createTimerService.execute.bind(createTimerService),
  );

  await bolt.start(Envs.API_PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
