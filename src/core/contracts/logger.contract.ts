export abstract class LoggerContract {
  abstract log(message: any, sufix?: string): void;
  abstract injectSufix(sufix: string): void;
}
