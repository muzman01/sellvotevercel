const steem = require("steem");
import connectDb from "@utils/connectDb";
import Web3 from "web3";
const {
  allUserFunction,
  addHash,
  allHash,
} = require("../../../utils/apiFunctions");

connectDb();
const ACC_NAME = process.env.ACC_NAME;
const ACC_KEY = process.env.ACC_KEY;
const WEBPROVİDER = process.env.TESTNETPROVİDER;
const web3 = new Web3(new Web3.providers.HttpProvider(WEBPROVİDER));
export default async function handler(req, res) {
  if (req.method === "POST") {
    const transicaitonHash = req.body.transicaitonHash;
    const walletAdress = req.body.walletAdress;
    const perml = req.body.perMLink;
    const payfee = req.body.fee;
    const authot = req.body.voteTo;
    const weight = req.body.voteWeigth;
    const frontBlock = req.body.blockNumber;
    const amountFee = req.body.amountFee;
    const range = weight * 100;
    const w2 = Number(range);
    const auth = authot.split("@");

    var receipt = await web3.eth.getTransactionReceipt(transicaitonHash);

    var lastBlockNumber = await web3.eth.getBlock("latest");

    const value = web3.eth.abi.decodeParameter("uint256", receipt.logs[0].data);

    if (
      receipt.from !== walletAdress.toLowerCase() ||
      transicaitonHash !== receipt.transactionHash ||
      value !== amountFee
    ) {
      return res.send({
        message: "error",
      });
    }
    const sonuc = await allHash(transicaitonHash);
    if (sonuc[0]?.transHash) {
      return res.send({
        message: "error",
      });
    }
    if (lastBlockNumber.number - frontBlock > 200) {
      allUserFunction(
        walletAdress,
        perml,
        payfee,
        auth[1],
        weight,
        true,
        false,
        transicaitonHash
      );
      return res.send({
        message: "error",
      });
    }
    steem.api.getAccounts([ACC_NAME], function (err, response) {
      var secondsago =
        (new Date() - new Date(response[0].last_vote_time + "Z")) / 1000;
      var vpow = response[0].voting_power + (10000 * secondsago) / 432000;
      vpow = Math.min(vpow / 100, 100).toFixed(2);

      if (vpow > 60) {
        addHash(transicaitonHash);
        if (w2 || auth[1] || perml) {
          steem.broadcast.vote(
            ACC_KEY,
            ACC_NAME,
            auth[1],
            perml,
            w2,
            function (err, result) {
              if (result) {
                allUserFunction(
                  walletAdress,
                  perml,
                  payfee,
                  auth[1],
                  weight,
                  true,
                  true,
                  transicaitonHash
                );
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
                allUserFunction(
                  walletAdress,
                  perml,
                  payfee,
                  auth[1],
                  weight,
                  true,
                  false,
                  transicaitonHash
                );
                res.send({
                  message: "error",
                });
              }
            }
          );
        } else {
          allUserFunction(
            walletAdress,
            perml,
            payfee,
            auth[1],
            weight,
            true,
            false,
            transicaitonHash
          );
          res.send({
            message: "error",
          });
        }
      } else {
        allUserFunction(
          walletAdress,
          perml,
          payfee,
          auth[1],
          weight,
          true,
          false,
          transicaitonHash
        );
        res.send({
          message: "error",
        });
      }
    });
  } else {
    res.status(500).json({ message: error.message });
  }
}
