import type { Collection } from "mongodb";
import type { User } from "../../module/users/models/User";
import type { TransactionGroup } from "../../module/transaction/models/TransactionGroup";
import type {
  TransactionCategory,
  TransactionCategoryCustom,
} from "../../module/transaction/models/TransactionCategory";
import { Transaction } from "~/module/transaction/models/Transaction";

export type Collections = {
  users: Collection<User>;
  transactions: {
    group: Collection<TransactionGroup>;
    detail: Collection<Transaction>;
    categories: {
      defaults: Collection<TransactionCategory>;
      custom: Collection<TransactionCategoryCustom>;
    };
  };
};
