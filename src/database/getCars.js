import { Car } from "../../models/models";
const stringAsNumber = (string) => {
  return isNaN(+string) ? null : +string;
};

export default async (query, page, limit) => {
  const pageAsNumber = +page;
  const limitAsNumber = +limit || 4;
  const skips = (pageAsNumber - 1) * limitAsNumber;
  const { make, price, model } = query;

  const isMakeTrue = make?.includes("all") ? true : false;
  const isModelTrue = model?.includes("all") ? true : false;
  let isMinPriceTrue = stringAsNumber(price.minPrice) ? false : true;
  let isMaxPriceTrue = stringAsNumber(price.maxPrice) ? false : true;

  const cars = await Car.aggregate([
    {
      $match: {
        $and: [
          { $or: [{ make: { $exists: isMakeTrue } }, { make }] },
          { $or: [{ model: { $exists: isModelTrue } }, { model }] },
          {
            $or: [
              { price: { $exists: isMinPriceTrue } },
              { price: { $gte: stringAsNumber(price.minPrice) } },
            ],
          },
          {
            $or: [
              { price: { $exists: isMaxPriceTrue } },
              { price: { $lte: stringAsNumber(price.maxPrice) } },
            ],
          },
        ],
      },
    },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        cars: [{ $skip: skips }, { $limit: limitAsNumber }],
      },
    },
  ]);

  return {
    cars: cars[0].cars,
    count: cars[0].cars.length,
    totalPages: Math.ceil(cars[0]?.totalCount[0]?.count / limitAsNumber),
  };
};
