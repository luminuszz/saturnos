import { LoggerContract } from '../../core/contracts/logger.contract';
import pino from 'pino';

export class PinoLoggerAdapter implements LoggerContract {
  private sufix: string = PinoLoggerAdapter.name;

  private readonly pino = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });

  public injectSufix = (sufix: string) => (this.sufix = sufix);

  log(message: any): void {
    this.pino.info(`${this.sufix} : ${JSON.stringify(message)}`);
  }
}
