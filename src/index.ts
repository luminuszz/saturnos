import 'reflect-metadata';
import 'dotenv/config';

import { App as BoltApp } from '@slack/bolt';
import { Saturnios } from './core/app';
import { Envs } from './config/envs.enum';

const boltInstance = new BoltApp({
  signingSecret: Envs.SLACK_SIGNING_SECRET,
  token: Envs.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: Envs.SLACK_APP_TOKEN,
});

(async () => {
  await boltInstance.start(Envs.PORT || 3000);

  console.log('⚡️ Bolt app is running!');

  Saturnios.ignite(boltInstance);
})();
