import connectDb from "../../../utils/connectDb";
import Awaitdata from "../../../models/awaitModel";

import validhash from "../../../utils/validhash";

connectDb();
let adress;   
export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createCategory(req, res)
            break;
        case "GET":
            await getCategories(req, res)
            break;
    }
}

const createCategory = async (req, res) => {
       
        adress = req.body.account;
        res.status(200).json({
          status:"başarılı",
          data:{
            account:req.body.account
          }
      })
     console.log(adress);
        


}

const getCategories = async (req, res) => {
    const hashUser = await Awaitdata.findOne({ walletAdress: adress });
   res.status(200).send(hashUser)
}
 
 

//   if(req.method === "GET" ){
//     res.status(200).send(adress)
//     const hashUser = await Awaitdata.findOne({ walletAdress: walletAdress });
//   } else {
//     res.status(301).json({
//       status: "denied",
//       data: {},
//     });
//   }



 