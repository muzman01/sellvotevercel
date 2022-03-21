const steem = require("steem");
import connectDb from "@utils/connectDb";
import Users from "../../../models/userModel";
connectDb();
export default async function handler(req, res) {
  // check method post
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
    const ACC_NAME = "robiniaswap";
    const ACC_KEY = "";
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
      var wif = steem.auth.toWif("robinia", "5JfQe4BQLcqZiKnNFd2RmFLWUp6QHoYg8pN2rbQV59FXhkEEEqE", "posting");

      // steem.broadcast.vote('5JfQe4BQLcqZiKnNFd2RmFLWUp6QHoYg8pN2rbQV59FXhkEEEqE', 'robinia', 'webtozu', '365scores-live-scores-news', 4800, function(err, result) {
      //   console.log(err, result);

      // });
      let operation = [
        [
          "vote",
          {
            voter: "robiniaswap",
            author:"webtozu",
            permlink: "bionluk",
            weight: 8000,
          },
        ],
      ];

    //   steem.broadcast.send(
    //     { operations: operation, extensions: [] },
    //     [""],
    //     function (err, result) {
         
    //      console.log(err,result)
    //    }
    //  );
    }

    //   const key = steem.auth.toWif(ACC_NAME, ACC_KEY, "posting");
    //   function streamVote(url, amount) {
    //   const memo = url.split("/");
    //   // const author = memo[4].split('@')[1];
    //   // const weight = calculateVotingWeight(amount);

    //   steem.broadcast.vote( ACC_NAME,key, auth, memo[5], weight, function (err, result) {
    //     console.log(
    //       "Voted Succesfully, permalink: " + memo[5] + ", author: " + auth + ", weight: " + weight + "%.",
    //       err
    //     );
    // });
    // }

    //  streamVote(`https://steemit.com/aaa/${kuladi}/${permlink}`, ` 0.01 SBD`);
  } else {
    res.status(301).json({
      status: "denied",
      data: {},
    });
  }
}
