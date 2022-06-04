const steem = require("steem");
import connectDb from "@utils/connectDb";

import Awaitdata from "../../../models/awaitModel";
import AddHash from "../../../models/addHash";

connectDb();

export default async function handler(req, res) {
  async function saveuser(walletAdress, perml, payfee, auth, weight) {
    const newUser = new Awaitdata({
      walletAdress: walletAdress,
      perMLink: perml,
      fee: payfee,
      voteTo: auth,
      voteWeigth: weight,
      payState: true,
      processTime: new Date(),
      voteState: false,
    });

    await newUser.save();
  }
  async function hatauser(walletAdress, perml, payfee, auth, weight) {
    const newUser = new Awaitdata({
      walletAdress: walletAdress,
      perMLink: perml,
      fee: payfee,
      voteTo: auth,
      voteWeigth: weight,
      payState: true,
      processTime: new Date(),
      voteState: false,
    });
    await newUser.save();
  }
  async function allsaveuser(walletAdress, perml, payfee, auth, weight) {
    const newUser = new Awaitdata({
      walletAdress: walletAdress,
      perMLink: perml,
      fee: payfee,
      voteTo: auth,
      voteWeigth: weight,
      payState: true,
      processTime: new Date(),
      voteState: true,
    });
    await newUser.save();
  }
  async function addHash(has) {
    const newHash = new AddHash({
      transHash: has,
    });
    await newHash.save();
  }
  async function allHash(hash) {
    const allHashs = await AddHash.find({ transHash: hash });
    return allHashs;
  }
  if (req.method === "POST") {
    const transicaitonHash = req.body.transicaitonHash;
    const walletAdress = req.body.walletAdress;
    const perml = req.body.perMLink;
    const payfee = req.body.fee;
    const authot = req.body.voteTo;
    const weight = req.body.voteWeigth;

    const ACC_NAME = process.env.ACC_NAME;
    const ACC_KEY = process.env.ACC_KEY;
    const range = weight * 100;
    const w2 = Number(range);
    const auth = authot.split("@");

    addHash(transicaitonHash);
    const sonuc = await allHash(transicaitonHash);

    if (sonuc[0]?.transHash) {
      return res.send({
        message: "error",
      });
    } else {
      console.log("şuan burda");
      steem.api.getAccounts([ACC_NAME], function (err, response) {
        var secondsago =
          (new Date() - new Date(response[0].last_vote_time + "Z")) / 1000;
        var vpow = response[0].voting_power + (10000 * secondsago) / 432000;
        vpow = Math.min(vpow / 100, 100).toFixed(2);

        if (vpow > 60) {
          if (w2 || auth[1] || perml) {
            steem.broadcast.vote(
              ACC_KEY,
              ACC_NAME,
              auth[1],
              perml,
              w2,
              function (err, result) {
                if (result) {
                  allsaveuser(walletAdress, perml, payfee, auth[1], weight);
                  res.send({
                    walletAdress: req.body.walletAdress,
                    perMLink: req.body.perMLink,
                    transicaitonHash: req.body.transicaitonHash,
                    fee: req.body.fee,
                    voteTo: req.body.voteTo,
                    voteWeigth: req.body.voteWeigth,
                    payState: req.body.payState,
                    processTime: req.body.processTime,
                    message: "Success",
                  });
                } else {
                  saveuser(walletAdress, perml, payfee, auth[1], weight);
                  res.send({
                    message: "error",
                  });
                }
              }
            );
          } else {
            hatauser(walletAdress, perml, payfee, auth[1], weight);
            res.send({
              message: "error",
            });
          }
        } else {
          saveuser(walletAdress, perml, payfee, auth[1], weight);
          res.send({
            message: "error",
          });
        }
      });
    }
  } else {
    res.status(500).json({ message: error.message });
  }
}
