export function EventPattern(eventName: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      public eventName = eventName;
    };
  };
}
