import 'reflect-metadata';
import 'dotenv/config';
import './container';

import { Bootstrap } from './boostrap';
import { container } from 'tsyringe';

(async () => {
  const app = container.resolve<Bootstrap>(Bootstrap);

  await app.run(3000);
})();
