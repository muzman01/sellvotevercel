import connectDb from "../../../utils/connectDb";
import Awaitdata from "../../../models/awaitModel";

import validhash from "../../../utils/validhash";
connectDb()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
    }
}

const getProduct = async (req, res) => {
    const hashUser = await Awaitdata.find();
    res.status(200).json({
      status:"iyi",
      data:{
        hashUser
      }
    })
    console.log(hashUser,"adres");
}