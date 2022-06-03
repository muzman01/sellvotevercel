const steem = require("steem");
import connectDb from "@utils/connectDb";

import Awaitdata from "../../../models/awaitModel";
import allUser from "../../../models/allUser";
connectDb();

export default async function handler(req, res) {
  // check method post
  async function saveuser(id, voteState) {
    const newCategory = await Awaitdata.findOneAndUpdate(
      { _id: id },
      { voteState }
    );
    res.json({
      msg: "Success! Update a new category",
      awaitmodels: {
        ...newCategory._doc,
        voteState: true,
      },
    });
  }
  async function hatauser(walletAdress, perml, payfee, dbto, weight) {
    const newUser = new Awaitdata({
      walletAdress: walletAdress,
      perMLink: perml,
      fee: payfee,
      voteTo: dbto,
      voteWeigth: weight,
      payState: true,
      processTime: new Date(),
      voteState: false,
    });
    await newUser.save();
  }
  async function allsaveuser(walletAdress, perml, payfee, dbto, weight) {
    const newUser = new allUser({
      walletAdress: walletAdress,
      perMLink: perml,
      fee: payfee,
      voteTo: dbto,
      voteWeigth: weight,
      payState: true,
      processTime: new Date(),
      voteState: true,
    });
    await newUser.save();
  }
  if (req.method === "POST") {
    const transicaitonHash = req.body.transicaitonHash;
    const walletAdress = req.body.walletAdress;
    const perml = req.body.perMLink;
    const payfee = req.body.fee;
    const authot = req.body.voteTo;
    const weight = req.body.voteWeigth;
    const voteState = req.body.voteState;
    const id = req.body.id;
    res.status(200).json({
      status: "success",
      data: {
        walletAdress: req.body.walletAdress,
        perMLink: req.body.perMLink,
        transicaitonHash: req.body.transicaitonHash,
        fee: req.body.fee,
        voteTo: req.body.voteTo,
        voteWeigth: req.body.voteWeigth,
        payState: req.body.payState,
        processTime: req.body.processTime,
        voteState: req.body.voteState,
        id: req.body.id,
      },
    });

    const hashUser = await Awaitdata.findOne({ walletAdress: walletAdress });

    const bdwallet = hashUser.walletAdress;
    const dbhash = hashUser.transicaitonHash;
    const bdpermlink = hashUser.perMLink;
    const dbfee = hashUser.fee;
    const dbweight = hashUser.voteWeigth;
    const dbto = hashUser.voteTo;
    const ACC_NAME = "robinia";
    const ACC_KEY = "key";
    const range = dbweight * 100;
    const w2 = Number(range);
    const auth = dbto.split("@");
    
  
    const key = steem.auth.toWif("robinia", "key", "posting");

    steem.broadcast.vote(
      "",
      "robinia",
      auth[1],
      bdpermlink,
      w2,
      function (err, result) {
       
        if (result) {
          saveuser(id, voteState);
        } else {
       
          saveuser(id, voteState);
        }
      }
    );
  } else {
    res.status(301).json({
      status: "denied",
      data: {},
    });
  }
}
