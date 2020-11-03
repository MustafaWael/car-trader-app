import { Schema, models, model } from "mongoose";

const Car = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  kilometers: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
});

export default models.Car || model("Car", Car);
