import React, { useEffect, useState, useContext } from "react";
import { tokens } from "../../../../public/token";
import { injected } from "@components/connector";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import abi from "../../../../public/abi.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import { BaseLayout } from "@components/ui/layout";
import { Card } from "@components/ui/order";
import { RightBar } from "@components/ui/common";
import axios from "axios";
import { DataCentext } from "../../../../store/Globalstate";
import "react-toastify/dist/ReactToastify.css";
import { postData,putData,deleteData } from "@utils/fetchData";
import valid from "../../../../utils/valid";
import validhash from "@utils/validhash";
import i18n from "../../../../i18n";
const Containeruser = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [product,setProduct] = useState([{
    createdAt: " ",
  fee: " ",
  payState: " ",
  perMLink: " ",
  processTime: " ",
  transicaitonHash: " ",
  updatedAt: " ",
  voteTo: " ",
  voteWeigth: " ",
  walletAdress: " ",
  __v: 0,
  voteState: ' ',
  _id: "62483d708586691f7242d7af"}])
  const [coins, setCoins] = useState([]);
  const [coins1, setCoins1] = useState([]);
  const [coins2, setCoins2] = useState([]);

  const [box, setBox] = useState([]);
  const [wadres, setWadres] = useState();
  const [userAdress, setUserAdress] = useState();
  const [voteto, setVoteto] = useState();
  const [time, setTime] = useState();
  const [pay, setPay] = useState();
  const [weigty, setWeigth] = useState();
  const { state, dispatch } = useContext(DataCentext);
  const [user, setUser] = useState([
    {
      walletad: "none",
      permlink: "none",
      fee: 0,
      voteto: "none",
      voteWeigth: 0,
      payState: "a",
      processTime: "a",
    },
  ]);

  const walletAdress = userAdress
  const perMLink=  product.perMLink
  const transicaitonHash = product.transicaitonHash
  const fee = product.fee
  const voteTo = product.voteTo
  const voteWeigth = product.voteWeigth
  const payState = true
  const processTime = product.processTime
  const voteState =  true
  const id = product._id
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/steem?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data.market_data.current_price.usd);
      
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/steem-dollars?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins1(res.data.market_data.current_price.usd);
        
        
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/tron?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins2(res.data.market_data.current_price.usd);
        
      })
      .catch((error) => console.log(error));
  }, []);

  const [myMessage, setMyMessage] = useState(
    <>
      {" "}
      <div
        className=" absolute w-96 h-96 text-center loading"
        style={{
          background: "gray",
          color: "white",
          top: 0,
          width: "100%",
          height: "100%",
          left: 0,
          position: "absolute",
          zIndex: 9,
        }}
      >
        <svg width="380" height="380" viewBox="0 0 40 50">
          <polygon
            strokeWidth="1"
            stroke="#fff"
            fill="none"
            points="20,1 40,40 1,40"
          ></polygon>
          <text fill="#fff" x="5" y="47">
            Loading
          </text>
        </svg>
      </div>
    </>
  );
  const [myDetails, setMyDetails] = useState({
    name: "none",
    address: "none",
    balance: 0,
    frozenBalance: 0,
    network: "none",
    link: "false",
  });

  const getBalance = async () => {
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
  const getWalletDetails = async () => {
    if (window.tronWeb) {
      //checking if wallet injected
      if (window.tronWeb.ready) {
        let tempBalance = await getBalance();
        let tempFrozenBalance = 0;

        if (!tempBalance.balance) {
          tempBalance.balance = 0;
        }

        //we have wallet and we are logged in
        setMyMessage(<h6>  <button onClick={denemuser} className="text-green-600 ml-3">Show result</button> </h6>);
        setMyDetails({
          name: window.tronWeb.defaultAddress.name,
          address: window.tronWeb.defaultAddress.base58,
          balance: tempBalance.balance / 1000000,
          frozenBalance: tempFrozenBalance / 1000000,
          network: window.tronWeb.fullNode.host,
          link: "true",
        });
        setWadres(window.tronWeb.defaultAddress.base58);
      } else {
        //we have wallet but not logged in
        setMyMessage(<h3 className="text-yellow-500">{i18n.t('WALLET DETECTED PLEASE LOGIN')}</h3>);
        setMyDetails({
          name: "none",
          address: "none",
          balance: 0,
          frozenBalance: 0,
          network: "none",
          link: "false",
        });
      }
    } else {
      //wallet is not detected at all
      setMyMessage(
        <h3  className="text-red-500">
          {i18n.t('WALLET NOT DETECTED')}
          <a
            href="https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/"
            className="text-blue-700"
          >
            TRONLİNK
          </a>
        </h3>
      );
    }
  };
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:3000/api/mongo/getuser", {
  //       wadres,
  //     })
  //     .then((res) => {
  //       console.log(res.data.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      getWalletDetails();
      axios
      .post("https://mmsellvote.vercel.app/api/mongo/getuser", {
        wadres,
      })
      .then((res) => {
     
        setUserAdress(res.data.data.wadres)
      
      })
      .catch((error) => console.log(error));
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });
  async function denemuser() {
    axios
      .get("https://mmsellvote.vercel.app/api/mongo/getuser")
      .then((res) => {
      
        setProduct(res.data.data.hashUser)
      })
      .catch((error) => console.log(error));
  }
  async function getUserprops() {}
  async function paidBusd() {
  
    
      
       
     
        dispatch({ type: "NOTIFY", payload: { loading: true} })
        try {
          // let tronweb = window.tronWeb;
          // let tx = await tronweb.transactionBuilder.sendTrx(
          //   "TK96qi3vfgAyknBgMSMCm5RYjWDdEdnJFd",
          //   10000
          // );
          // let signedTx = await tronweb.trx.sign(tx);
          // let broastTx = await tronweb.trx.sendRawTransaction(signedTx);
          // console.log(broastTx);
    
            
          
           
             
              try {
                await axios
                  .post("https://mmsellvote.vercel.app/api/mongo/userVote", {
                    walletAdress,
                    perMLink,
                    transicaitonHash,
                    fee,
                    voteTo,
                    voteWeigth,
                    payState,
                    processTime,
                    voteState,
                    id
                  })
                  .then((data) => {
                   
                  });
              } catch (error) {
                console.log(error);
              }
              
              toast.success("Oy kullanma işlemi başarılı", {position: toast.POSITION.TOP_CENTER,});
             
            
  
              
              
          //apiyi çağır
        } catch (error) {
          console.log(error ,"error");
         
        }
      
    
  }
  return (
    <div
      data-aos="fade-right"
      className=" bg-gradient-to-r from-gray-100 to-gray-50  pb-4"
    >
      <div className="  px-8 py-1 ">
        <p className="text-gray-500 text-lg">BlokField</p>
      
      </div>
      <div data-aos="fade-left" className="flex   p-4 space-x-3">
        <Card title="TRON" balance={1} icon={0} token={coins2} />
        <Card title="SBD" balance={1} icon={1} token={coins1} />
        <Card title="STEEM" balance={1} icon={2} token={coins} />
      </div>
      <div className="flex  ml-3 mt-6 space-x-6  mr-4">
        <BaseLayout>
          <div className="flex  ml-3 mt-6 space-x-6  mr-4">
            {myMessage} 
             {wadres}
           
          </div>
          <div>
          { product.walletAdress ===" "  ? (<>
                    <h1 className="mt-11 text-green-700 text-5xl text-center">{i18n.t('There is no previous transaction.')}</h1>
                    </>):(<>
          <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-6">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-6">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          {i18n.t('Vote weight')}
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          {i18n.t('Permlink')}
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                           {i18n.t('TRX')}
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                         {i18n.t('Voted account')}
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          {i18n.t('Payment status')}
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          {i18n.t('Voting status')}
                        </th>
                      </tr>
                      

                    </thead>
                
                      {product.map((walletAdress) => (
                    <tbody>
                      
                        <tr className="border-b" key={walletAdress._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" >
                          {walletAdress.voteWeigth} %
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.perMLink}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.fee}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.voteTo}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 text-center whitespace-nowrap">
                        {walletAdress.payState ? (
                          <p className="border-b bg-green-100 border-green-200">{i18n.t('Paid')}</p>
                        ): (<p className="border-b bg-red-100 border-red-200">{i18n.t('not paid')} | <button className="text-green-600">Ödeme yap</button></p>)}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 text-center whitespace-nowrap">
                        {walletAdress.voteState ? (
                          <p className="border-b bg-green-100 border-green-200">{i18n.t('Voted')}</p>
                        ): (<p className="border-b bg-red-100 border-red-200">{i18n.t('Error')} | <button className="text-green-600" >{i18n.t('Vote')}</button></p>)}
                        </td>
                      </tr>
                   
                     
                    </tbody>
                    ))}
                   
                    
                  </table>
                </div>
              </div>
            </div>
          </div>
          </>)}
          </div>

        </BaseLayout>
        <RightBar />
      </div>
    </div>
  );
};

export default Containeruser;
