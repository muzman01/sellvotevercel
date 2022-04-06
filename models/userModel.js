import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    transicaitonHash: {
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
    payState: {
      type: Boolean,
      default: false,
    },
    processTime: {
      type: Date,
      required: false,
    },
    voteState:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);

export default Dataset