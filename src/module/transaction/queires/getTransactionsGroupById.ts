import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import clamp from "lodash/clamp.js";

import type { ObjectId } from "mongodb";
import type { InputMaybe } from "~/graphql/types/graphql";

import type { Collections } from "~/infra/types/Collections";
import { LOOKUP_TRANSACTION_CATEGORY } from "~/module/transaction/handlers/getLookupTransactionGroup";
import { Transaction } from "~/module/transaction/models/Transaction";

import Cursor from "~/utils/Cursor";
import stripUndefined from "~/utils/stripUndefined";

export type TransactionsWithDetails = Transaction & {
  categoryType: string;
};

export default async function getTransactionsGroupById(
  collections: Collections,
  limit: number,
  transactionGroupId: ObjectId,
  filterByPeriod: Date,
  filterByCategoryId?: InputMaybe<ObjectId>,
  filterBySearch?: InputMaybe<string>,
  cursor?: InputMaybe<Cursor>
) {
  const nodesPerPage = clamp(limit, 1, 50);
  const skipOffset = cursor?.get("offset", 0) || 0;
  const lastDayOfTheMonth = endOfDay(endOfMonth(filterByPeriod));
  const stratDayOfMonth = startOfDay(startOfMonth(filterByPeriod));

  const currentTransaction = await collections.transactions.detail
    .aggregate<{
      nodes: TransactionsWithDetails[];
      pageInfo: { totalCount: number };
    }>([
      {
        $match: stripUndefined({
          transactionGroupId,
          date: {
            $gte: stratDayOfMonth,
            $lte: lastDayOfTheMonth,
          },
          deletedAt: { $exists: false },
          categoryId: filterByCategoryId || undefined,
          description: filterBySearch
            ? { $regex: filterBySearch, $options: "i" }
            : undefined,
        }),
      },
      ...LOOKUP_TRANSACTION_CATEGORY,
      {
        $addFields: {
          categoryType: {
            $ifNull: ["$categoryCustom.type", "$categoryDefault.type"],
          },
        },
      },
      {
        $facet: {
          nodes: [{ $skip: skipOffset }, { $limit: nodesPerPage }],
          pageInfo: [{ $count: "totalCount" }],
        },
      },
      { $unwind: "$pageInfo" },
    ])
    .toArray();

  if (currentTransaction.length === 0) {
    return {
      nodes: [],
      totalCount: 0,
      pageInfo: {
        hasNextPage: false,
        cursor: null,
        totalCount: 0,
      },
    };
  }
  const [{ nodes, pageInfo }] = currentTransaction;
  const hasNextPage = (pageInfo?.totalCount || 0) > skipOffset + nodesPerPage;

  const categoriesId = nodes.map((node) => node.categoryId);

  const categriesCustom = await collections.transactions.categories.custom
    .find({
      categoryDefaultId: {
        $in: categoriesId,
      },
    })
    .toArray();

  return {
    nodes: nodes.map((node) => {
      const isCustomized = categriesCustom.find(
        (custom) => custom.categoryDefaultId === node.categoryId
      );

      return {
        ...node,
        categoryId: isCustomized?._id || node.categoryId,
      };
    }),
    totalCount: pageInfo.totalCount,
    pageInfo: {
      hasNextPage,
      cursor: hasNextPage
        ? new Cursor({
            limit: nodesPerPage,
            offset: skipOffset + nodes.length,
          })
        : null,
      totalCount: pageInfo.totalCount,
    },
  };
}
