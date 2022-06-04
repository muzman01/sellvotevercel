import mongoose from "mongoose";

const addHash = new mongoose.Schema(
  {
    transHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.addHash || mongoose.model("addHash", addHash);

export default Dataset;
