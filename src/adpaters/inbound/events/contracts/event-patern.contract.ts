export abstract class EventPaternContract {
  public abstract execute(payload: unknown): Promise<any>;
}
