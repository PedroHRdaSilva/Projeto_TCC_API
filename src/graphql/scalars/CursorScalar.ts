// FUTURE REFACTOR
import { GraphQLScalarType, Kind } from "graphql";
import { Map } from "immutable";
import Cursor from "../../utils/Cursor";

const CursorScalar = new GraphQLScalarType({
  name: "Cursor",
  description: "A pagination Cursor",

  serialize(value) {
    return value ? wrapCursor(value as any) : null;
  },

  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? unwrapCursor(ast.value) : null;
  },

  parseValue(value) {
    return unwrapCursor(value as any);
  },
});

export default CursorScalar;

function wrapCursor(cursor: Cursor) {
  assertCursor(cursor);

  const jsonCursor = JSON.stringify({
    offset: Math.max(0, cursor.get("offset") || 0),
    limit: Math.max(1, cursor.get("limit")),
    metadata: cursor.get("metadata").toJS(),
  });

  return Buffer.from(jsonCursor, "ascii").toString("base64");
}

function unwrapCursor(cursor: string): Cursor | null {
  const jsonString = Buffer.from(cursor, "base64").toString("ascii");

  try {
    const jsonCursor = JSON.parse(jsonString);
    assertCursor(jsonCursor);

    return new Cursor({
      offset: jsonCursor.offset,
      limit: jsonCursor.limit,
      metadata: Map<string, any>(jsonCursor.metadata || {}),
    });
  } catch (err) {
    return null;
  }
}

function assertCursor(cursor: any) {
  const { offset, limit } = cursor;

  if (offset !== null) {
    if (typeof offset !== "number") {
      throw new Error("Invalid offset");
    }

    // eslint-disable-next-line no-restricted-globals
    if (offset === -1 || offset === Infinity || isNaN(offset)) {
      throw new Error("Invalid offset");
    }
  }

  if (typeof limit !== "number") {
    throw new Error("Invalid offset");
  }

  // eslint-disable-next-line no-restricted-globals
  if (limit === -1 || limit === Infinity || isNaN(limit)) {
    throw new Error("Invalid limit");
  }
}
