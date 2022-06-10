import mongoose from "mongoose";

const awaitSchema = new mongoose.Schema(
  {
    //   walletAdress: String,
    //   permLink: String,
    //   transicationHash: String,
    //   fee: Number,
    //   voteTo: String,
    //   voteWeight: String
    walletAdress: {
      type: String,
      required: true,
    },
    perMLink: {
      type: String,
      required: false,
    },
    fee: {
      type: Number,
      required: true,
    },
    voteTo: {
      type: String,
      required: true,
    },
    voteWeigth: {
      type: Number,
      required: false,
    },
    hash: {
      type: String,
      required: false,
    },
    payState: {
      type: Boolean,
      default: false,
    },
    processTime: {
      type: Date,
      required: false,
    },
    voteState: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.awaitModel || mongoose.model("awaitModel", awaitSchema);

export default Dataset;
