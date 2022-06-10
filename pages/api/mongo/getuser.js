import connectDb from "../../../utils/connectDb";
import Awaitdata from "../../../models/awaitModel";

connectDb();
let adress;
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await getCategories(req, res);
      break;
  }
};

const createCategory = async (req, res) => {
  adress = req.body.account;
  res.status(200).json({
    status: "naber",
    data: {
      wadres: req.body.account,
    },
  });
};
const getCategories = async (req, res) => {
  const address = req.query.wadres;
  const hashUser = await Awaitdata.find({ walletAdress: address }).sort({
    createdAt: -1,
  });
  const filterData = hashUser.filter((data) => address === data.walletAdress);

  res.status(200).json({
    status: "success",
    data: {
      hashUser: filterData,
    },
  });
};
