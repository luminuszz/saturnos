export abstract class EventPaternContract {
  protected constructor(public eventName: string) {}

  public abstract execute(payload: unknown): Promise<any>;
}
