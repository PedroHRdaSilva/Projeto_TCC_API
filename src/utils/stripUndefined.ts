import { pickBy } from "lodash-es";

export default function stripUndefined<T extends Record<string, any>>(
  input: T
) {
  return pickBy<T>(input, (value) => value !== undefined);
}
