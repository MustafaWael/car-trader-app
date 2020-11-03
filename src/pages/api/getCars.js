import { mongodb_connect } from "../../../utils";
import { getCars } from "../../database";

export default async (req, res) => {
  const { make, model, minPrice, maxPrice, page, limit } = req.query;

  mongodb_connect();

  const query = {
    make: make,
    model: model,
    price: {
      minPrice,
      maxPrice,
    },
  };

  try {
    const filteredCars = await getCars(query, page, limit);
    res.json(filteredCars);
  } catch (err) {
    res.json({ message: err });
  }
};
