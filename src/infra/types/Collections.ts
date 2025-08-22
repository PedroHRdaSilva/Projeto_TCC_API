import type { Collection } from "mongodb";
import type { User } from "../../module/users/models/User";

export type Collections = {
  users: Collection<User>;
};
