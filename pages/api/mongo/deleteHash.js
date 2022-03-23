import connectDb from "../../../utils/connectDb";
import Users from "../../../models/userModel";

import validhash from "../../../utils/validhash";

connectDb();
export default async (req, res) => {
    switch(req.method){
        case "GET":
            await deleteHash(req, res)
            break;

    }
}
const deleteHash = async (req, res) => {
    try {
        const {
            walletAdress,
            transicaitonHash,
          } = req.body;
          const errMsg = validhash(
            walletAdress,
            transicaitonHash,
 
          );
          if (errMsg) return res.status(400).json({ err: errMsg });

        const newCategory = await Users.findOneAndDelete({walletAdress:walletAdress}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted User : ", docs);
            }
            });
        res.json({
            msg: "Success! Update a new category",
            users: {
                ...newCategory._doc,
                transicaitonHash
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}