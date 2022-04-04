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
import { postData,putData,deleteData } from "@utils/fetchData";
import abi from "../../../../public/abi.json";
import TronWeb from "tronweb"
import valid from "../../../../utils/valid";
import validhash from "@utils/validhash";
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://nile.trongrid.io/");
const solidityNode = new HttpProvider("https://nile.trongrid.io/");
const eventServer = new HttpProvider("https://nile.trongrid.io/");
const privateKey = "df7667823943deb71d14cefaa9ad5e591f831cc0b67f67b15756ff95cf47a96a";
const tronWeb = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKey
);
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
  const [myDetails, setMyDetails] = useState({
    name: 'none',
    address: 'none',
    balance: 0,
    frozenBalance: 0,
    network: 'none',
    link: 'false',
  });
  const [cactive, setCactive] = useState("");

  const getBalancee = async () => {
    //if wallet installed and logged , getting TRX token balance
    if (window.tronWeb && window.tronWeb.ready) {
      let walletBalances = await window.tronWeb.trx.getAccount(
        window.tronWeb.defaultAddress.base58
      );
      return walletBalances;
    } else {
      return 0;
    }
  };

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
      axios.get("https://mmsellvote.vercel.app/api/calculation").then((data) => {
      
        setYeniGuc(data.data);
        var sonhali = (parseFloat(data.data) * range) / 100;
        let steemİlk = sonhali / 2;
        let sbdİlk = sonhali / 2;
        let steemSon = steemİlk * coins;
        let sbdSon = sbdİlk * coins1;


        let ÖdenecekBusd = (steemSon + sbdSon) / coins2;
        //setDolarg(ÖdenecekBusd);
        setTimeout(getCalculation, 1000);
      });
    }
    getCalculation();
  }, [coins, coins1, coins2]);

  const { active, account, library, connector, chainId, activate, deactivate } =
    useWeb3React();
  const web3 = new Web3(library);
  
  const userData ={
    walletAdress:myDetails.address,
    perMLink:permlink,
    transicaitonHash:transHash,
    fee:dolarg,
    voteTo:kuladi,
    voteWeigth:range,
    payState: false,
    processTime:new Date(),
  }
  const hashData ={
    walletAdress:myDetails.address,

    transicaitonHash:transHash,

  }
  const deleteData ={
    walletAdress:myDetails.address,

    transicaitonHash:transHash,

  }
  const walletAdress = myDetails.address
  const perMLink=  permlink
  const transicaitonHash = transHash
  const fee = dolarg
  const voteTo = kuladi
  const voteWeigth = range
  const payState = false
  const processTime = new Date()
  async function connect() {
   
        if (window.tronWeb) {
          //checking if wallet injected
          if (window.tronWeb.ready) {
            let tronweb = window.tronWeb;
            let tempBalance = await getBalancee();
            let tempFrozenBalance = 0;
    
            if (!tempBalance.balance) {
              tempBalance.balance = 0;
            }
            const tadres = tempBalance.__payload__.address;
            let signedTx = tronweb.trx.sign(tadres);
            signedTx.then(function(result) {
              if(result){
                toast.success("Giriş işlemi başarılı", {
                  position: toast.POSITION.TOP_CENTER,
                });
                setCactive(result) // "Some User token"
              }
              
           })
          
            setMyDetails({
              name: window.tronWeb.defaultAddress.name,
              address: window.tronWeb.defaultAddress.base58,
              balance: tempBalance.balance / 1000000,
              frozenBalance: tempFrozenBalance / 1000000,
              network: window.tronWeb.fullNode.host,
              link: 'true',
            });
          } else {
            //we have wallet but not logged in
            console.log("lütfen cüzdana bağlanın");
            toast.warn("Tronlinke bağlanılmadı", {
              position: toast.POSITION.TOP_CENTER,
            });
            
          }
        } else {
          //wallet is not detected at all
          toast.warn("Lütfen tronlinki ekleyin", {
            position: toast.POSITION.TOP_CENTER,
          });
        }

  }


  async function stateDegis(props){
    if(props != transHash){
      setTransHash(props)
      console.log("hash değişecek",props);
    }else{
      console.log("hash değişemiyor amk");
    }
    
  }
 
  async function paidBusd() {
  
    if (myDetails.balance < dolarg) {
     return toast.error("Yeterli bakiyen yok", {
        position: toast.POSITION.TOP_CENTER,
      });
    } 
    if(myDetails.balance > dolarg) {
      toast.success("İşlem yapılıyor lütfen bekleyin", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    
      if (myDetails.balance > 0) {
       
        console.log(transHash,"has bu");
        dispatch({ type: "NOTIFY", payload: { loading: true} })
        try {
          let tronweb = window.tronWeb;
          let tx = await tronweb.transactionBuilder.sendTrx(
            "TK96qi3vfgAyknBgMSMCm5RYjWDdEdnJFd",
            10000
          );
          let signedTx = await tronweb.trx.sign(tx);
          let broastTx = await tronweb.trx.sendRawTransaction(signedTx);
          console.log(broastTx);
    
            
          
           
              console.log("suan burda");
              try {
                await axios
                  .post("https://mmsellvote.vercel.app/api/transications", {
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
              toast.success("Oy kullanma işlemi başarılı", {position: toast.POSITION.TOP_CENTER,});
              return dispatch({type:'NOTIFY', payload:{success:res.msg}});
            
  
              
              
          //apiyi çağır
        } catch (error) {
          console.log(error ,"error");
          // try {
          //   await axios
          //     .post("https://mmsellvote.vercel.app/api/transications", {
          //       walletAdress,
          //       perMLink,
          //       transicaitonHash,
          //       fee,
          //       voteTo,
          //       voteWeigth,
          //       payState,
          //       processTime
          //     })
          //     .then((data) => {
          //       console.log(data.data);
          //     });
          // } catch (error) {
          //   console.log(error);
          // }
          
          // const errMsgHash = validhash(  
          //   walletAdress,
          //   transicaitonHash
          // );
          // if (errMsgHash) return dispatch({ type: "NOTIFY", payload: { error: errMsgHash } });
          // dispatch({ type: "NOTIFY", payload: { loading: true} })
          
          // const res = await putData('mongo/putHash',hashData)
          // if(res.err)return dispatch({type:'NOTIFY', payload:{error:res.err}})
          // toast.success("Oy kullanma işlemi başarılı", {position: toast.POSITION.TOP_CENTER,});
          // return dispatch({type:'NOTIFY', payload:{success:res.msg}});
        

          
          // return dispatch({type:'NOTIFY', payload:{success: toast.success("Oy kullanma işlemi başarılı", {position: toast.POSITION.TOP_CENTER,})}});
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
        .post("https://mmsellvote.vercel.app/api/transications", {
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
                {cactive.length > 60 ? (
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
            {cactive.length > 60 ? (
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
