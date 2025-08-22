import { Map, Record } from "immutable";

export type TCursorRecord = {
  limit: number;
  offset: number | null;
  metadata: Map<string, any>;
};

const CursorRecord = Record<TCursorRecord>({
  limit: 1,
  offset: null,
  metadata: Map<string, any>(),
});

export default class Cursor extends CursorRecord {
  public static fromLimitAndOffset(limit: number, offset: number): Cursor {
    return new Cursor({
      limit,
      offset,
    });
  }
}
