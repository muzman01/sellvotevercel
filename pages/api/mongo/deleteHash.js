import connectDb from "../../../utils/connectDb";
import Users from "../../../models/userModel";

import validhash from "../../../utils/validhash";

connectDb();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await deleteHash(req, res);
      break;
  }
};
const deleteHash = async (req, res) => {
  try {
    const { walletAdress } = req.body;
    console.log(walletAdress);
    Users.findOneAndDelete(
      { walletAdress: walletAdress },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted User : ", docs);
        }
      }
    );

  res.status(200).json({
    status: "success",
    data: {
      data: walletAdress
    }
  })
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
