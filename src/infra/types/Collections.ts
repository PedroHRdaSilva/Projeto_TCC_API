import type { Collection } from "mongodb";
import type { User } from "../../module/users/models/User";
import { TransactionGroup } from "../../module/transaction/models/TransactionGroup";

export type Collections = {
  users: Collection<User>;
  transactionGroup: Collection<TransactionGroup>;
};
