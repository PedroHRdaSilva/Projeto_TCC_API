import { ObjectId } from "mongodb";
import type { DefaultFields } from "~/utils/CommonTypes";

export type TransactionGroup = DefaultFields & {
  ownerId: ObjectId;
  iconProperties: {
    background: string;
    color: string;
    icon: string;
  };
  description: string;
};
