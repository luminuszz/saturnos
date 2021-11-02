type EventHandler = (payload: any) => void;

export abstract class ConnectorContract {
  public abstract event(
    eventName: string,
    handler: EventHandler,
  ): Promise<void>;
}
