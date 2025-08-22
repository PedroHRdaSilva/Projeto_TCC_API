import type { ObjectId } from "mongodb";

export type DefaultFields = {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type DefaultFieldsWithDeleted = DefaultFields & {
  deletedAt?: Date | null;
  deletedBy?: ObjectId | null;
};
