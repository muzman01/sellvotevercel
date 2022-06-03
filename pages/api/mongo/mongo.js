
import connectDb from "../../../utils/connectDb";
import Users from "../../../models/userModel";
import valid from "../../../utils/valid";

connectDb();

export default async (req, res) => {
  
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
    
  }
};

const register = async (req, res) => {
  try {
    const {
      walletAdress,
      perMLink,
      transicaitonHash,
      fee,
      voteTo,
      voteWeigth,
      payState,
      processTime,
    } = req.body;
    const errMsg = valid(
      walletAdress,
      perMLink,
      transicaitonHash,
      fee,
      voteTo,
      voteWeigth,
      payState,
      processTime
    );
    if (errMsg) return res.status(400).json({ err: errMsg });
   
    const newUser = new Users({
      walletAdress,
      perMLink,
      transicaitonHash,
      fee,
      voteTo,
      voteWeigth,
      payState,
      processTime,
    });
    await newUser.save()
    res.json({ msg: "kayıt başarılı" });
  } catch (err) {
    const wll = req.body.walletAdress;
    Users.findOneAndDelete(
      { walletAdress: wll },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted User : ", docs);
        }
      }
    );
      return res.status(500).json({err:err.message})
  }
};
