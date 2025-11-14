import type { ObjectId } from "mongodb";
import type { Collections } from "~/infra/types/Collections";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { LOOKUP_TRANSACTION_CATEGORY } from "~/module/transaction/handlers/getLookupTransactionGroup";
import { TransactionsByCategoryChart } from "~/module/transaction/models/TransactionsByCategoryChart";

export default async function getMonthlySpendingByCategory(
  collections: Collections,
  transactionGroupId: ObjectId | undefined,
  filterByStartMonth?: Date,
  filterByEndMonth?: Date
) {
  const match: any = {
    transactionGroupId,
    deletedAt: { $exists: false },
  };

  if (filterByStartMonth) {
    const startDate = startOfDay(startOfMonth(new Date(filterByStartMonth)));
    const endDate = filterByEndMonth
      ? endOfDay(endOfMonth(new Date(filterByEndMonth)))
      : endOfDay(endOfMonth(new Date(filterByStartMonth)));

    match.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }
  const monthlySpendingByCategory = await collections.transactions.detail
    .aggregate<TransactionsByCategoryChart>([
      {
        $match: match,
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
        $match: {
          categoryType: "EXPENSES",
        },
      },
      {
        $group: {
          _id: {
            month: { $dateTrunc: { unit: "month", date: "$date" } },
            categoryId: "$categoryId",
          },
          transactions: { $push: "$$ROOT" },
          amount: { $sum: "$amount" },
          categoryType: { $first: "$categoryType" },
          categoryId: { $first: "$categoryId" },
          reportDate: {
            $first: { $dateTrunc: { unit: "month", date: "$date" } },
          },
        },
      },

      { $sort: { reportDate: 1, amount: -1 } },
    ])
    .toArray();

  return monthlySpendingByCategory;
}
