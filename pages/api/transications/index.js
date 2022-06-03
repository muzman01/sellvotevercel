const steem = require("steem");
import connectDb from "@utils/connectDb";
import Users from "../../../models/userModel";
import Awaitdata from "../../../models/awaitModel";
import allUser from "../../../models/allUser";
connectDb();
let basarili;
let hatali;
const baseUrl = process.env.ACC_KEY;
export default async function handler(req, res) {
  // check method post
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
    console.log(newUser);
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
  if (req.method === "POST") {
    const transicaitonHash = req.body.transicaitonHash;
    const walletAdress = req.body.walletAdress;
    const perml = req.body.perMLink;
    const payfee = req.body.fee;
    const authot = req.body.voteTo;
    const weight = req.body.voteWeigth;
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
      },
    });
    const ACC_NAME = "robinia";
    const ACC_KEY = "key";
    const range = weight * 100;
    const w2 = Number(range);
    const auth = authot.split("@");
    console.log(w2);
    console.log(auth[1]);
    console.log(perml);
    console.log(ACC_KEY);
    console.log(ACC_NAME);

    steem.api.getAccounts(["robinia"], function (err, response) {
      var secondsago =
        (new Date() - new Date(response[0].last_vote_time + "Z")) / 1000;
      var vpow = response[0].voting_power + (10000 * secondsago) / 432000;
      vpow = Math.min(vpow / 100, 100).toFixed(2);
      console.log(vpow, "buda hesaplama");
      if (vpow > 60) {
        console.log("burda oy alanı");
        if (w2 || auth[1] || perml) {
          console.log("oy kullanma alanı");
          const key = steem.auth.toWif("robinia", ACC_KEY, "posting");

          steem.broadcast.vote(
            ACC_KEY,
            "robinia",
            auth[1],
            perml,
            w2,
            function (err, result) {
              console.log(err, result);
              if (result) {
                allsaveuser(walletAdress, perml, payfee, auth[1], weight);
                // Users.findOneAndDelete(
                //   { walletAdress: walletAdress },
                //   function (err, docs) {
                //     if (err) {
                //       console.log(err);
                //     } else {
                //       console.log("Deleted User : ", docs);
                //     }
                //   }
                // );
              } else {
                console.log("suan oy başarısız oldu");

                saveuser(walletAdress, perml, payfee, auth[1], weight);
              }
            }
          );
        } else {
          console.log("eşit olmayan veri var");
          hatauser(walletAdress, perml, payfee, auth[1], weight);
        }
      } else {
        console.log("oygğcğ dğşğk");
        saveuser(walletAdress, perml, payfee, auth[1], weight);
      }
    });
  } else {
    res.status(301).json({
      status: "denied",
      data: {},
    });
  }
}
