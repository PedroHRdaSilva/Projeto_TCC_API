import type { Collections } from "~/infra/types/Collections";
import type { Viewer } from "~/infra/types/Viewer";
import stripUndefined from "~/utils/stripUndefined";

export default async function getTransactionsGroup(
  collections: Collections,
  viewer: Viewer,
  search?: string | null
) {
  const transactions = await collections.transactions.group
    .find(
      stripUndefined({
        ownerId: viewer._id,
        description: search ? { $regex: search } : undefined,
        deletedAt: {
          $exists: false,
        },
      })
    )
    .toArray();

  return transactions;
}
