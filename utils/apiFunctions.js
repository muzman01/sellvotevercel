var steem = require("steem");
let lastValue =[]
let powerw =[]
function getAccountDetailPower() {
  let voteValue = 0;
  var STEEMIT_VOTE_REGENERATION_SECONDS = 432e3,
    STEEMIT_100_PERCENT = 1e4;
  function getUTCDate(e) {
    return new Date(e + "Z");
  }
  function getSteemPower(params) {
    let account_vesting_shares_available = parseInt(
      parseInt(params.vesting_shares.replace(" VESTS", "")) +
        parseInt(params.received_vesting_shares.replace(" VESTS", "")) -
        parseInt(params.delegated_vesting_shares.replace(" VESTS", "")) -
        parseInt(params.vesting_withdraw_rate.replace(" VESTS", ""))
    );
    let votingpower = params.voting_power;
    let last_vote_elapsed_seconds =
      (new Date() - getUTCDate(params.last_vote_time)) / 1e3;
    votingpower =
      (votingpower +
        (STEEMIT_100_PERCENT * last_vote_elapsed_seconds) /
          STEEMIT_VOTE_REGENERATION_SECONDS) /
      100;
    votingpower = 100 < votingpower ? 100 : votingpower.toFixed(2);

    powerw = votingpower;
    let used_power = parseInt(
      (100 * votingpower * (100 * 100)) / STEEMIT_100_PERCENT
    );

    used_power = parseInt((used_power + 49) / 50);
    let rshares = parseInt(account_vesting_shares_available * used_power * 100);
    rshares = ((rshares + 2e12) * (rshares + 2e12) - 4e24) / (rshares + 8e12);

    return rshares;
  }
  function getRewardFund(rshares_convergent_linear) {
    steem.api.getRewardFund("post", function (e, t) {
      let steem_per_rshares =
        t.reward_balance.replace(/ STEEM| HIVE/, "") / t.recent_claims;
      finalize(rshares_convergent_linear, steem_per_rshares);
    });
  }
  function finalize(rshares_convergent_linear, steem_per_rshares) {
    steem.api.getCurrentMedianHistoryPrice(function (e, t) {
      let steem_price_sbd =
        t.base.replace(/ SBD| HBD/, "") / t.quote.replace(/ STEEM| HIVE/, "");

      let value =
        rshares_convergent_linear * steem_per_rshares * steem_price_sbd;

      lastValue = value.toFixed(2);
    });
  }

  steem.api.getAccounts([process.env.ACC_NAME], function (err, result) {
    let steemPower = getSteemPower(result[0]);

    getRewardFund(steemPower);
  });
  return powerw;
}

function getAccountDetailDolar() {
    let voteValue = 0;
    var STEEMIT_VOTE_REGENERATION_SECONDS = 432e3,
      STEEMIT_100_PERCENT = 1e4;
    function getUTCDate(e) {
      return new Date(e + "Z");
    }
    function getSteemPower(params) {
      let account_vesting_shares_available = parseInt(
        parseInt(params.vesting_shares.replace(" VESTS", "")) +
          parseInt(params.received_vesting_shares.replace(" VESTS", "")) -
          parseInt(params.delegated_vesting_shares.replace(" VESTS", "")) -
          parseInt(params.vesting_withdraw_rate.replace(" VESTS", ""))
      );
      let votingpower = params.voting_power;
      let last_vote_elapsed_seconds =
        (new Date() - getUTCDate(params.last_vote_time)) / 1e3;
      votingpower =
        (votingpower +
          (STEEMIT_100_PERCENT * last_vote_elapsed_seconds) /
            STEEMIT_VOTE_REGENERATION_SECONDS) /
        100;
      votingpower = 100 < votingpower ? 100 : votingpower.toFixed(2);
  
      powerw = votingpower;
      let used_power = parseInt(
        (100 * votingpower * (100 * 100)) / STEEMIT_100_PERCENT
      );
  
      used_power = parseInt((used_power + 49) / 50);
      let rshares = parseInt(account_vesting_shares_available * used_power * 100);
      rshares = ((rshares + 2e12) * (rshares + 2e12) - 4e24) / (rshares + 8e12);
  
      return rshares;
    }
    function getRewardFund(rshares_convergent_linear) {
      steem.api.getRewardFund("post", function (e, t) {
        let steem_per_rshares =
          t.reward_balance.replace(/ STEEM| HIVE/, "") / t.recent_claims;
        finalize(rshares_convergent_linear, steem_per_rshares);
      });
    }
    function finalize(rshares_convergent_linear, steem_per_rshares) {
      steem.api.getCurrentMedianHistoryPrice(function (e, t) {
        let steem_price_sbd =
          t.base.replace(/ SBD| HBD/, "") / t.quote.replace(/ STEEM| HIVE/, "");
  
        let value =
          rshares_convergent_linear * steem_per_rshares * steem_price_sbd;
  
        lastValue = value.toFixed(2);
      });
    }
  
    steem.api.getAccounts(["robinia"], function (err, result) {
      let steemPower = getSteemPower(result[0]);
  
      getRewardFund(steemPower);
    });
    return lastValue;
  }
module.exports = {
 getAccountDetailDolar,
 getAccountDetailPower
};
