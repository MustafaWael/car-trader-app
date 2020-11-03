import { Car } from "../../models/models";

export default async () => {
  const cars = await Car.aggregate([
    {
      $group: {
        _id: `$make`,
        count: { $sum: 1 },
        make: { $max: "$make" },
        // model: { $max: "$model" },
        // year: { $max: "$year" },
        // kilometers: { $max: "$kilometers" },
        // price: { $max: "$price" },
        // photoUrl: { $max: "$photoUrl" },
        // details: { $max: "$details" },
      },
    },
    {
      $project: {
        _id: 0,
        make: 1,
        model: 1,
        year: 1,
        kilometers: 1,
        price: 1,
        photoUrl: 1,
        details: 1,
        count: 1,
      },
    },
  ]);

  return cars;
};
