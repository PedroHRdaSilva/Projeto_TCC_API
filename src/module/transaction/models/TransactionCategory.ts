import type { ObjectId } from "mongodb";
import {
  DefaultFields,
  DefaultFieldsWithDeleted,
} from "../../../utils/CommonTypes";
import { ITransactionCategoryTypeEnum } from "../../../graphql/types/graphql";

export type TransactionCategory = DefaultFields & {
  type: ITransactionCategoryTypeEnum;
  iconProperties: {
    background: string;
    color: string;
    icon: string;
  };
  description: string;
};

export type TransactionCategoryCustom = DefaultFieldsWithDeleted &
  TransactionCategory & {
    transactionGroupId: ObjectId;
    categoryDefaultId?: ObjectId;
    isHidden?: boolean;
  };
