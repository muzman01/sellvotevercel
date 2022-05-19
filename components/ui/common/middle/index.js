import React, { useEffect, useState, useContext } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import AppsIcon from "@material-ui/icons/Apps";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { DataCentext } from "../../../../store/Globalstate";
import { tokens } from "../../../../public/token";
import { injected } from "@components/connector";
import { postData, putData, deleteData } from "@utils/fetchData";
import abi from "../../../../public/abi.json";
import TronWeb from "tronweb";
import valid from "../../../../utils/valid";
import validhash from "@utils/validhash";
import i18n from "../../../../i18n";
import { withTranslation } from "react-i18next";
import { useRouter } from 'next/router'
const baseUrl = process.env.BASE_URL;
const Middle = () => {
  //https://api.trongrid.io
  //https://api.tronstack.io
  const router = useRouter()
  const [blc, setBlc] = useState(0);
  const [yeniGuc, setYeniGuc] = useState(0);
  const [bscActive, setBscActive] = useState(false);
  const [coins, setCoins] = useState([]);
  const [coins1, setCoins1] = useState([]);
  const [coins2, setCoins2] = useState([]);
  const [range, setRange] = useState(50);
  const [dolarg, setDolarg] = useState((yeniGuc * 50) / 100);
  const [box, setBox] = useState();
  const [permlink, setPermlink] = useState("");
  const [kuladi, setKuladi] = useState("");
  const { state, dispatch } = useContext(DataCentext);
  const [transHash, setTransHash] = useState("hashhash");
  const [myDetails, setMyDetails] = useState({
    name: "none",
    address: "none",
    balance: 0,
    frozenBalance: 0,
    network: "none",
    link: "false",
  });
  const [cactive, setCactive] = useState(false);
  const { active, account, library, connector, chainId, activate, deactivate } =
    useWeb3React();
  const web3 = new Web3(library);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/steem?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/steem-dollars?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins1(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/binance-usd?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins2(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    async function getCalculation() {
      axios.get(`${baseUrl}/api/calculation`).then((data) => {
        setYeniGuc(data.data);
        var sonhali = (parseFloat(data.data) * range) / 100;
        let steemİlk = sonhali / 2;
        let sbdİlk = sonhali / 2;
        let steemSon = steemİlk * coins;
        let sbdSon = sbdİlk * coins1;

        let ÖdenecekBusd = steemSon + sbdSon;

        setDolarg(ÖdenecekBusd);
      });
    }
    getCalculation();
  }, [coins, coins1, coins2]);

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
          setBscActive(true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);
  const userData = {
    walletAdress: account,
    perMLink: permlink,
    transicaitonHash: transHash,
    fee: dolarg,
    voteTo: kuladi,
    voteWeigth: range,
    payState: false,
    processTime: new Date(),
  };

  const hashData = {
    walletAdress: account,

    transicaitonHash: transHash,
  };
  const deleteData = {
    walletAdress: account,

    transicaitonHash: transHash,
  };
  const walletAdress = account;
  const perMLink = permlink;
  const transicaitonHash = transHash;
  const fee = dolarg;
  const voteTo = kuladi;
  const voteWeigth = range;
  const payState = false;
  const processTime = new Date();
  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
      localStorage.setItem("walletAdress", `${account}`);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function stateDegis(props) {
    if (props != transHash) {
      setTransHash(props);
    } else {
    }
  }
  function reload() {
    router.reload();
  }


  async function paidBusd() {
    const tokenAddress = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
    const contract = await new web3.eth.Contract(abi, tokenAddress);
    const tokenBalance = await contract.methods.balanceOf(account).call();
    console.log(`BUSD balance: ${tokenBalance / 10 ** 18}`);
    console.log(fee);
    if (fee > Number(tokenBalance)) {
      return toast.error("Insufficient funds!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (fee < Number(tokenBalance)) {
      toast.success("Processing, please wait!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (fee > 0) {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const tokenAddress = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
      const contract = await new web3.eth.Contract(abi, tokenAddress);
      const tokenBalance = await contract.methods.balanceOf(account).call();
      console.log(`BUSD balance: ${tokenBalance / 10 ** 18}`);
      const tokenCount = tokenBalance / 10 ** 18;
      if (chainId === 97 && tokenCount > 0) {
        const gasPrice = await web3.eth.getGasPrice();
        const tokenTransferResult = await contract.methods
          .transfer(
            "0xBd87Afe44d68907285C32e7E82A132346c8Cb6DC",
            web3.utils.toWei(`${fee}`, "ether")
          )
          .send(
            {
              from: account,
              gasPrice,
            },
            async function (error, transactionHash) {
              if (transactionHash) {
                try {
                  try {
                    await axios
                      .post(`${baseUrl}/api/transications`, {
                        walletAdress,
                        perMLink,
                        transicaitonHash,
                        fee,
                        voteTo,
                        voteWeigth,
                        payState,
                        processTime,
                      })
                      .then((data) => {
                        data;
                      });
                  } catch (error) {
                    console.log(error);
                  }

                  const errMsgHash = validhash(walletAdress, transicaitonHash);
                  if (errMsgHash)
                    return dispatch({
                      type: "NOTIFY",
                      payload: { error: errMsgHash },
                    });
                  dispatch({ type: "NOTIFY", payload: { loading: true } });

                  toast.success("Voting successful!", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  return dispatch({
                    type: "NOTIFY",
                    payload: { success: "success" },
                  });

                  //apiyi çağır
                } catch (error) {
                  console.log(error);
                  return dispatch({
                    type: "NOTIFY",
                    payload: {
                      error: toast.warning("Error", {
                        position: toast.POSITION.TOP_CENTER,
                      }),
                    },
                  });
                }
              } else {
                dispatch({
                  type: "NOTIFY",
                  payload: {
                    error: toast.warning("Transaction canceled", {
                      position: toast.POSITION.TOP_CENTER,
                    }),
                  },
                });
               
             
                try {
                  await axios
                    .post(`${baseUrl}/api/mongo/deleteHash`, {
                      walletAdress,
                    })
                    .then((data) => {
                      if(data.data){
                        console.log("burda",walletAdress);
                        reload()
                      }
                      
                    });
                } catch (error) {
                  console.log(error);
                }
  

     
              }
            }
          );

        console.log(tokenTransferResult.transactionHash);
      }
    }
  }

  const hesaplama = (values) => {
    setRange(values.target.value);
    var sonhali = (yeniGuc * values.target.value) / 100;
    let steemİlk = sonhali / 2;
    let sbdİlk = sonhali / 2;
    let steemSon = steemİlk * coins;
    let sbdSon = sbdİlk * coins1;

    let ÖdenecekBusd = (steemSon + sbdSon) / coins2;
    setDolarg(ÖdenecekBusd);
  };
  async function postLink() {
    try {
      await axios
        .post(`${baseUrl}/api/mongo/deleteHash`, {
          walletAdress,
        })
        .then((data) => {
          console.log(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const checked = async (e) => {
    if (e.target.checked) {
      setCactive(true);
      //https://api.trongrid.io
      //https://api.tronstack.io

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
      if (errMsg) {
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      } else {
        setBox(e.target.checked);
      }
      dispatch({ type: "NOTIFY", payload: { loading: true } });

      const res = await postData("mongo/mongo", userData);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    } else {
      setBox(e.target.checked);
    }
  };
  const inputValue = (e) => {
    let url = e.target.value;
    const array = url.split("/");
    setPermlink(array[5]);
    setKuladi(array[4]);
  };

  return (
    <div data-aos="flip-down">
      <div className="backgorund">
        <h2 className="h2">{i18n.t("Upvote Post")}</h2>
        <div className="pb-12">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm pt-5">
            <form className="w-80">
              <div className="form-group mb-6">
                <span>{i18n.t("Current voting power")}</span>
                <input
                  type="text"
                  className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput90"
                  placeholder={`$ ${yeniGuc}`}
                  disabled
                />
              </div>
              <div className="form-group mb-6">
                <span>{range}%</span>
                <input
                  type="range"
                  className="
      form-range
      appearance-none
      w-full
      h-1
      p-0
      bg-blue-600
      focus:outline-none focus:ring-0 focus:shadow-none
    "
                  id="customRange1"
                  onChangeCapture={hesaplama}
                  disabled={cactive}
                />
              </div>

              <div className="form-group mb-6">
                <span>{i18n.t("Amount of BUSD to pay")}</span>

                <input
                  type="email"
                  className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput91"
                  placeholder={`${dolarg.toFixed(2)} BUSD`}
                  disabled
                />
              </div>
              <div className="form-group mb-6">
                {active ? (
                  <>
                    <span>{i18n.t("Post Link")}</span>
                    <input
                      type="text"
                      className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleInput91"
                      placeholder="Post Link"
                      onChange={inputValue}
                    />
                    <span>
                      BUSD {dolarg.toFixed(2)}{" "}
                      {i18n.t("Please confirm to get  votes")}{" "}
                      <input
                        className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-2 align-top bg-no-repeat bg-center bg-contain float-right mr-2 cursor-pointer"
                        name="isGoing"
                        type="checkbox"
                        onChange={checked}
                        disabled={cactive}
                      />
                    </span>
                  </>
                ) : (
                  <p>
                    {i18n.t(
                      "You cant make transaction without connecting to your wallet!"
                    )}
                  </p>
                )}
              </div>
            </form>
            {active ? (
              <button
                type="submit"
                className={
                  box
                    ? "w-full px-6 py-2.5 bg-blue-600  text-white  font-medium  text-xs  leading-tight  uppercase  rounded  shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg transition duration-150  ease-in-out cursor-progress "
                    : "w-full px-6 py-2.5 bg-red-600  text-white  font-medium  text-xs  leading-tight  uppercase  rounded  shadow-md    focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg transition duration-150  ease-in-out cursor-not-allowed"
                }
                onClick={paidBusd}
                disabled={!box}
              >
                {i18n.t("Pay")}{" "}
              </button>
            ) : (
              <button
                type="submit"
                className="
    w-full
    px-6
    py-2.5
    bg-blue-600
    text-white
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded
    shadow-md
    hover:bg-blue-700 hover:shadow-lg
    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-blue-800 active:shadow-lg
    transition
    duration-150
    ease-in-out"
                onClick={connect}
              >
                {i18n.t("Connect wallet")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Middle);
