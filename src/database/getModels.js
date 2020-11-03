import { Car } from "../../models/models";

export default async (make) => {
  const models = await Car.aggregate([
    { $match: { make } },
    {
      $group: { _id: "$model", model: { $max: "$model" }, count: { $sum: 1 } },
    },
    { $project: { _id: 0, model: 1, count: 1 } },
  ]);

  return models;
};
