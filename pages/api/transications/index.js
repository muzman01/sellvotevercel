const steem = require("steem");
import connectDb from "@utils/connectDb";
import Users from "../../../models/userModel";
connectDb();
let basarili;
let hatali;
export default async function handler(req, res) {
  // check method post
   function deleteUser(){
     Users.findOneAndDelete({walletAdress:walletAdress}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Deleted User : ", docs);
      }
      });
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
    const ACC_KEY = process.env.ACC_KEY;
    const range = weight * 100;
    const w2 = Number(range);
    const auth = authot.split("@");
     console.log(w2);
    console.log(auth[1]);
    console.log(perml);
    console.log(ACC_KEY);
    console.log(ACC_NAME);
    const hashUser = await Users.findOne({ walletAdress: walletAdress });
    
    const bdwallet = hashUser.walletAdress;
    const dbhash = hashUser.transicaitonHash;
    const bdpermlink = hashUser.perMLink;
    const dbfee = hashUser.fee;
    const dbweight = hashUser.voteWeigth;
    const dbto = hashUser.voteTo;
   
    if (
      bdpermlink === perml ||
      bdwallet === walletAdress ||
      dbhash === transicaitonHash ||
      dbfee === payfee ||
      dbweight === weight ||
      dbto === authot
    ) {
      console.log("oy kullanma alanı");
      var wif = steem.auth.toWif("robinia", ACC_KEY, "posting");

      steem.broadcast.vote(ACC_KEY, 'robinia', perml, auth, w2, function(err, result) {
        console.log(err, result);
        Users.findOneAndDelete({walletAdress:walletAdress}, function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
              console.log("Deleted User : ", docs);
          }
          });
      });
 
    }

 
  } else {
    res.status(301).json({
      status: "denied",
      data: {},
    });
  }
 
}
