import 'reflect-metadata';
import 'dotenv/config';
import './config/container-ioc';

import { Bootstrap } from './boostrap';
import { container } from 'tsyringe';
import { Envs } from './config/envs.enum';

(async () => {
  const app = container.resolve<Bootstrap>(Bootstrap);

  await app.run(Envs.API_PORT || 3000);
})();
