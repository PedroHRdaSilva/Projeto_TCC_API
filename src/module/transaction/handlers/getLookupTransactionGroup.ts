export const LOOKUP_TRANSACTION_CATEGORY = [
  {
    $lookup: {
      from: "transactions.categories.defaults",
      localField: "categoryId",
      foreignField: "_id",
      as: "categoryDefault",
      pipeline: [{ $project: { type: 1 } }],
    },
  },
  { $unwind: { path: "$categoryDefault", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "transactions.categories.custom",
      localField: "categoryId",
      foreignField: "_id",
      as: "categoryCustom",
      pipeline: [{ $project: { type: 1 } }],
    },
  },
  { $unwind: { path: "$categoryCustom", preserveNullAndEmptyArrays: true } },
];
