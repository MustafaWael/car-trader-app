import { get } from "mongoose";

const getAsString = (value) => {
  return Array.isArray(value) ? value[0] : value;
};

export default getAsString;
