import {
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import type { ObjectId } from "mongodb";
import type { InputMaybe } from "~/graphql/types/graphql";
import { ITransactionCategoryTypeEnum } from "~/graphql/types/graphql";
import type { Collections } from "~/infra/types/Collections";
import { LOOKUP_TRANSACTION_CATEGORY } from "~/module/transaction/handlers/getLookupTransactionGroup";
import { Transaction } from "~/module/transaction/models/Transaction";

import stripUndefined from "~/utils/stripUndefined";

export default async function getGroupTransactionTotals(
  collections: Collections,
  transactionGroupId: ObjectId,
  filterByPeriod: Date,
  filterByCategoryId?: InputMaybe<ObjectId>,
  filterBySearch?: InputMaybe<string>
) {
  const lastDayOfTheMonth = endOfDay(endOfMonth(filterByPeriod));
  const stratDayOfMonth = startOfDay(startOfMonth(filterByPeriod));
  const startDayOfThePreviusMonth = startOfDay(subMonths(filterByPeriod, 1));
  const endDayOfThePreviusMonth = endOfDay(
    endOfMonth(startDayOfThePreviusMonth)
  );

  const [currentTransaction, previousTransaction] = await Promise.all([
    collections.transactions.detail
      .aggregate<
        Transaction & {
          categoryType: string;
        }
      >([
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
              ? { $regex: filterBySearch }
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
      ])
      .toArray(),

    collections.transactions.detail
      .aggregate<Transaction & { categoryType: string }>([
        {
          $match: stripUndefined({
            transactionGroupId,
            date: {
              $gte: startDayOfThePreviusMonth,
              $lte: endDayOfThePreviusMonth,
            },
            deletedAt: { $exists: false },
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
      ])
      .toArray(),
  ]);

  const totalCurrentExpense = currentTransaction
    .filter(
      (transaction) =>
        transaction.categoryType === ITransactionCategoryTypeEnum.Expenses
    )
    .reduce((total, transaction) => total + (transaction.amount || 0), 0);

  const totalPreviousExpense = previousTransaction
    .filter(
      (transaction) =>
        transaction.categoryType === ITransactionCategoryTypeEnum.Expenses
    )
    .reduce((total, transaction) => total + (transaction.amount || 0), 0);

  const totalCurrentEarnings = currentTransaction
    .filter(
      (transaction) =>
        transaction.categoryType === ITransactionCategoryTypeEnum.Earnings
    )
    .reduce((total, transaction) => total + (transaction.amount || 0), 0);

  const totalPreviousEarnings = previousTransaction
    .filter(
      (transaction) =>
        transaction.categoryType === ITransactionCategoryTypeEnum.Earnings
    )
    .reduce((total, transaction) => total + (transaction.amount || 0), 0);

  const totalCurrentBalance = totalCurrentEarnings - totalCurrentExpense;
  const totalPreviousBalance = totalPreviousEarnings - totalPreviousExpense;

  return {
    balance: {
      percentageVariation:
        totalPreviousBalance !== 0
          ? (totalCurrentBalance - totalPreviousBalance) / totalPreviousBalance
          : 0,
      total: totalCurrentBalance || 0,
    },
    expense: {
      percentageVariation:
        totalPreviousExpense !== 0
          ? (totalCurrentExpense - totalPreviousExpense) / totalPreviousExpense
          : 0,
      total: totalCurrentExpense || 0,
    },
    revenue: {
      percentageVariation:
        totalPreviousEarnings !== 0
          ? (totalCurrentEarnings - totalPreviousEarnings) /
            totalPreviousEarnings
          : 0,
      total: totalCurrentEarnings || 0,
    },
  };
}
