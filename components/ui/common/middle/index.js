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
import { postData,putData } from "@utils/fetchData";
import abi from "../../../../public/abi.json";

import valid from "../../../../utils/valid";
import validhash from "@utils/validhash";
const Middle = () => {

  const [blc, setBlc] = useState(0);
  const [yeniGuc, setYeniGuc] = useState(0);

  const [coins, setCoins] = useState([]);
  const [coins1, setCoins1] = useState([]);
  const [coins2, setCoins2] = useState([]);
  const [range, setRange] = useState(50);
  const [dolarg, setDolarg] = useState((yeniGuc * 50) / 100);
  const [box, setBox] = useState();
  const [permlink, setPermlink] = useState("");
  const [kuladi, setKuladi] = useState("");
  const {state, dispatch} = useContext(DataCentext);
  const[transHash,setTransHash] = useState("hashhash");
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
      axios.get("http://localhost:3000/api/calculation").then((data) => {
      
        setYeniGuc(data.data);
        var sonhali = (parseFloat(data.data) * range) / 100;
        let steemİlk = sonhali / 2;
        let sbdİlk = sonhali / 2;
        let steemSon = steemİlk * coins;
        let sbdSon = sbdİlk * coins1;


        let ÖdenecekBusd = (steemSon + sbdSon) / coins2;
        setDolarg(ÖdenecekBusd);
        setTimeout(getCalculation, 3000);
      });
    }
    getCalculation();
  }, [coins, coins1, coins2]);

  const { active, account, library, connector, chainId, activate, deactivate } =
    useWeb3React();
  const web3 = new Web3(library);
  const userData ={
    walletAdress:account,
    perMLink:permlink,
    transicaitonHash:transHash,
    fee:dolarg,
    voteTo:kuladi,
    voteWeigth:range,
    payState: false,
    processTime:new Date(),
  }
  const hashData ={
    walletAdress:account,

    transicaitonHash:transHash,

  }
  const walletAdress = account
  const perMLink=  permlink
  const transicaitonHash = transHash
  const fee = dolarg
  const voteTo = kuladi
  const voteWeigth = range
  const payState = false
  const processTime = new Date()
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {}
  }

  async function disconnect() {
    try {
      await deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function getBalance() {
    let accountWeb3 = await web3.eth
      .getAccounts()
      .then((accounts) => accounts[0]);

    for (let tokenAddress of tokens) {
      const contract = new web3.eth.Contract(abi, tokenAddress);
      const tokenBalance = await contract.methods.balanceOf(accountWeb3).call();
      console.log(`${tokenAddress} balance: ${tokenBalance}`);
      setBlc(tokenBalance / 10 ** 18);
    }
  }

  async function paidBusd() {
    const tokenAddress = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
    const contract = await new web3.eth.Contract(abi, tokenAddress);
    const tokenBalance = await contract.methods.balanceOf(account).call();

    console.log(`BUSD balance: ${tokenBalance / 10 ** 18}`);
    const tokenCount = tokenBalance / 10 ** 18;
 
    if (tokenCount < 1) {
      toast.error("Yeterli bakiyen yok", {
        position: toast.POSITION.TOP_CENTER,
      });
    } 
    if(tokenCount > 1) {
      toast.success("İşlem yapılıyor lütfen bekleyin", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    
      if (chainId === 97 && tokenCount > 0) {
        const gasPrice = await web3.eth.getGasPrice();
        console.log(transHash,"has bu");
        try {
          const tokenTransferResult = await contract.methods
            .transfer(
              "0xBd87Afe44d68907285C32e7E82A132346c8Cb6DC",
              web3.utils.toWei("1", "ether")
            )
            .send({
              from: account,
              gasPrice,
            });
            const hash = await tokenTransferResult.events.Transfer.transactionHash
            console.log(hash);

            setTransHash(hash);
            
          
            if(transHash.length > 20){
              console.log("suan burda");
              try {
                await axios
                  .post("http://localhost:3000/api/transications", {
                    walletAdress,
                    perMLink,
                    transicaitonHash,
                    fee,
                    voteTo,
                    voteWeigth,
                    payState,
                    processTime
                  })
                  .then((data) => {
                    console.log(data.data);
                  });
              } catch (error) {
                console.log(error);
              }
              
              const errMsgHash = validhash(  
                walletAdress,
                transicaitonHash
              );
              if (errMsgHash) return dispatch({ type: "NOTIFY", payload: { error: errMsgHash } });
              dispatch({ type: "NOTIFY", payload: { loading: true} })
              
              const res = await putData('mongo/putHash',hashData)
              if(res.err)return dispatch({type:'NOTIFY', payload:{error:res.err}})
              return dispatch({type:'NOTIFY', payload:{success:res.msg}})
              
            }
          //apiyi çağır
        } catch (error) {
          console.error("Hata oluştu");
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
        .post("http://localhost:3000/api/transications", {
          permlink,
          kuladi,
          range,
        })
        .then((data) => {
          console.log(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  
  // function dbKayit() {
  //   const errMsg = valid(
  //     walletAdress,
  //     perMLink,
  //     transicaitonHash,
  //     fee,
  //     voteTo,
  //     voteWeigth,
  //     payState,
  //     processTime
  //   );
  //   if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
  //   dispatch({ type: "NOTIFY", payload: { success: "gönderme tamam" } });
  // }
  const checked = async (e) => {
    if (e.target.checked) {
      console.log(e.target.checked);
      setBox(e.target.checked);
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
      if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      dispatch({ type: "NOTIFY", payload: { loading: true} })
      
      const res = await postData('mongo/mongo',userData)
      if(res.err)return dispatch({type:'NOTIFY', payload:{error:res.err}})
      return dispatch({type:'NOTIFY', payload:{success:res.msg}})
     
    } else {
      console.log("selimedi");
      setBox(e.target.checked);
    }
  };
  const inputValue = (e) => {
    console.log(e.target.value);
    let url = e.target.value;
    const array = url.split("/");
    setPermlink(array[5]);
    setKuladi(array[4]);
  };

  return (
    <div data-aos="flip-down">
      <div className="backgorund">
        <h2 className="h2">Upvote Post</h2>
        <div className="pb-12">
          <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm pt-5">
            <form className="w-80">
              <div class="form-group mb-6">
                <span>Mevcut oy gücü:</span>
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
                />
              </div>

              <div className="form-group mb-6">
                <span>Ödenecek BUSD:</span>

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
                    <span>Gönderi link:</span>
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
                      placeholder="Gönderi Linki"
                      onChange={inputValue}
                    />
                    <span>
                      $ {dolarg.toFixed(2)} oyu almak için lutfen onaylayın:{" "}
                      <input
                        className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-2 align-top bg-no-repeat bg-center bg-contain float-right mr-2 cursor-pointer"
                        name="isGoing"
                        type="checkbox"
                        onChange={checked}
                      />
                    </span>
                  </>
                ) : (
                  <p>Çüzdana bağlanmadan işlem yapamazsın</p>
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
                Ödeme Yap{" "}
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
                Connet Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
