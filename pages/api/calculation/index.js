var steem = require("steem");
const cheerio = require("cheerio");
const rp = require("request-promise");
var fs = require("fs");
import axios from "axios";
var lastCalculationTime = new Date().getTime();
var lastValue = 0;
var powerw = 0;
let steemdlr;
export default async function handler(req, res) {
  // check method post
  if (req.method === "GET") {
   
    let jsonValue = {};
    async function getSpAmount() {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/steem?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
        )
        .then((res) => {
          steemdlr = res.data.market_data.current_price.usd;
        })
        .catch((error) => console.log(error));
      return new Promise((resolve) => {
        var url = "https://steemd.com/@robinia";

        rp(url).then((html) => {
          let sp = [];

          var $ = cheerio.load(html);
          const res = $("p:contains('SP')").text();
          var a = res.trim();
          var b = a.replace(",", ".");
          sp = b.slice(0, -2);
          var c = sp.replace(",", "");
          var d = c.replace(".", "");

          // var b = sp.substring(0,7);
          var sonSp = parseFloat(d);

          var sampleObject = { sonSp };

          jsonValue = sampleObject;

          resolve();
        });
      });
    }
    function calculateWeight() {
      return new Promise((resolve) => {
        steem.api.getDynamicGlobalProperties(function (err, result) {
          const totalVestingFundSteem = parseFloat(
            result.total_vesting_fund_steem.split(" ")[0]
          );

          // Calculate the amount of STEEM to transfer
          const totalVestingShares = parseFloat(
            result.total_vesting_shares.split(" ")[0]
          );
          
          steem.api.getRewardFund("post", function (e, t) {
            const json = jsonValue;
            const steem_per_vest = totalVestingFundSteem / totalVestingShares; // steem_per_mvests / 1E6
            const reward_balance = t.reward_balance.split(" ")[0];
            const recent_claims = t.recent_claims;
            const reward_per_rshare = reward_balance / recent_claims;
            const steem_price_sbd = steemdlr; // feed_price.base / feed_price.quote

            steem.api.getAccounts(["robinia"], function (err, response) {
              var secondsago =
                (new Date() - new Date(response[0].last_vote_time + "Z")) /
                1000;
              var vpow =
                response[0].voting_power + (10000 * secondsago) / 432000;
              vpow = Math.min(vpow / 100, 100).toFixed(2);
              var sppower = response[0].vesting_shares;

              function calculateVoteValue(
                steem_power = json.sonSp,
                voting_power = vpow,
                voting_weight = 100
              ) {
                const vests = steem_power / steem_per_vest;
                let multiplicator = voting_power * voting_weight;
                // some normalization of the vote multiplicator
                multiplicator = parseInt((multiplicator + 49) / 50);
                const reward =
                  parseInt(vests * multiplicator * 100) *
                  reward_per_rshare *
                  steem_price_sbd;
                console.log(vpow);
                powerw = vpow;
                let reward2 = reward / 2;
                let sbdDolar = 4.26;
                let steemDolar = 0.322;
                let kodulsbd = (reward2 / 2) * sbdDolar;
                let kodulsteem = (reward2 / 2) * steemDolar;
                let sonuc = kodulsbd + kodulsteem;
                console.log(reward);
                resolve(reward);
              }

              calculateVoteValue();
            });
          });
        });
      });
    }
    function calculaPower() {
      return new Promise((resolve) => {
        steem.api.getDynamicGlobalProperties(function (err, result) {
          const totalVestingFundSteem = parseFloat(
            result.total_vesting_fund_steem.split(" ")[0]
          );

          // Calculate the amount of STEEM to transfer
          const totalVestingShares = parseFloat(
            result.total_vesting_shares.split(" ")[0]
          );

          steem.api.getRewardFund("post", function (e, t) {
            const json = jsonValue;
            const steem_per_vest = totalVestingFundSteem / totalVestingShares; // steem_per_mvests / 1E6
            const reward_balance = t.reward_balance.split(" ")[0];
            const recent_claims = t.recent_claims;
            const reward_per_rshare = reward_balance / recent_claims;
            const steem_price_sbd = steemdlr; // feed_price.base / feed_price.quote

            steem.api.getAccounts(["robinia"], function (err, response) {
              var secondsago =
                (new Date() - new Date(response[0].last_vote_time + "Z")) /
                1000;
              var vpow =
                response[0].voting_power + (10000 * secondsago) / 432000;
              vpow = Math.min(vpow / 100, 100).toFixed(2);
              var sppower = response[0].vesting_shares;

              function calculateVoteValue(
                steem_power = json.sonSp,
                voting_power = vpow,
                voting_weight = 100
              ) {
                const vests = steem_power / steem_per_vest;
                let multiplicator = voting_power * voting_weight;
                // some normalization of the vote multiplicator
                multiplicator = parseInt((multiplicator + 49) / 50);
                const reward =
                  parseInt(vests * multiplicator * 100) *
                  reward_per_rshare *
                  steem_price_sbd;
                console.log(vpow);
                powerw = vpow;
                let reward2 = reward / 2;
                let sbdDolar = 4.26;
                let steemDolar = 0.322;
                let kodulsbd = (reward2 / 2) * sbdDolar;
                let kodulsteem = (reward2 / 2) * steemDolar;
                let sonuc = kodulsbd + kodulsteem;
                console.log(vpow);
                resolve(vpow);
              }

              calculateVoteValue();
            });
          });
        });
      });
    }
    async function startBot() {
      await getSpAmount();
      lastValue = (await calculateWeight()).toFixed(2);
      powerw = await calculaPower();
      lastCalculationTime = new Date().getTime();
      res.status(200).json({
        lastValue,
        powerw,
      });
    }
    await startBot();
  } else {
    res.status(301).json({
      status: "denied",
      data: {},
    });
  }
}
