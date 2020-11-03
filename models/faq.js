import { Schema, model, models } from "mongoose";

const Faq = new Schema({
  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },
});

export default models.faqs || model("faqs", Faq);
