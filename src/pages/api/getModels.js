import { mongodb_connect } from "../../../utils";
import { getModels } from "../../database";

export default async (req, res) => {
  mongodb_connect();
  const { make } = req.query;
  const models = await getModels(make);
  res.json(models);
};
