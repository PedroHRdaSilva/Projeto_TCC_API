import type { ObjectId } from "mongodb";
import type { Collections } from "~/infra/types/Collections";

import { ITransactionCategoryTypeEnum } from "~/graphql/types/graphql";

import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { Transaction } from "~/module/transaction/models/Transaction";
import { LOOKUP_TRANSACTION_CATEGORY } from "~/module/transaction/handlers/getLookupTransactionGroup";

type MonthlyRevenueVsExpenses = {
  reportDate: Date;
  revenue: number;
  expense: number;
  transactions: (Transaction & {
    categoryType: string;
  })[];
};
export default async function getMonthlyRevenueVsExpenses(
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
  const monthlyRevenueVsExpenses = await collections.transactions.detail
    .aggregate<MonthlyRevenueVsExpenses>([
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
        $group: {
          _id: { $dateTrunc: { unit: "month", date: "$date" } },
          reportDate: {
            $first: { $dateTrunc: { unit: "month", date: "$date" } },
          },
          revenue: {
            $sum: {
              $cond: [
                {
                  $eq: ["$categoryType", ITransactionCategoryTypeEnum.Earnings],
                },
                "$amount",
                0,
              ],
            },
          },
          expense: {
            $sum: {
              $cond: [
                {
                  $eq: ["$categoryType", ITransactionCategoryTypeEnum.Expenses],
                },
                "$amount",
                0,
              ],
            },
          },
          transactions: {
            $push: {
              _id: "$_id",
              transactionGroupId: "$transactionGroupId",
              categoryId: "$categoryId",
              description: "$description",
              date: "$date",
              isRecurringPayment: "$isRecurringPayment",
              installments: "$installments",
              creditCardId: "$creditCardId",
              amount: "$amount",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      },
      {
        $sort: { reportDate: 1 },
      },
    ])
    .toArray();

  return monthlyRevenueVsExpenses;
}
