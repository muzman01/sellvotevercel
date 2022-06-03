

const {
  getAccountDetailDolar,
  getAccountDetailPower,
} = require("../../../utils/apiFunctions");
export default async function handler(req, res) {
  // check method post
  if (req.method === "GET") {
    async function startBot() {
      let lastValue = getAccountDetailDolar();
      let powerw = getAccountDetailPower();
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
