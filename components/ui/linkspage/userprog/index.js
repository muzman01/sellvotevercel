import React, { useEffect, useState, useContext } from "react";
import { tokens } from "../../../../public/token";
import { injected } from "@components/connector";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import abi from "../../../../public/abi.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { BaseLayout } from "@components/ui/layout";
import { Card } from "@components/ui/order";
import { RightBar } from "@components/ui/common";
import axios from "axios";
import { DataCentext } from "../../../../store/Globalstate";

const Containeruser = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [coins, setCoins] = useState([]);
  const [coins1, setCoins1] = useState([]);
  const [coins2, setCoins2] = useState([]);

  const [box, setBox] = useState([]);
  const [wadres, setWadres] = useState();
  const [perm, setPerm] = useState();
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

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/steem?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data.market_data.current_price.usd);
        console.log(res.data.market_data.current_price.usd);
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
        console.log(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/binance-usd?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins2(res.data.market_data.current_price.usd);
        console.log(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  }, []);

  const [myMessage, setMyMessage] = useState(
    <>
      {" "}
      <div
        className=" absolute w-96 h-96 text-center loading"
        style={{
          background: "#0008",
          color: "white",
          top: 0,
          width: "100%",
          height: "100%",
          left: 0,
          position: "absolute",
          zIndex: 9,
        }}
      >
        <svg width="400" height="400" viewBox="0 0 40 50">
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
        setMyMessage(<h6>WALLET CONNECTED</h6>);
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
        setMyMessage(<h3>WALLET DETECTED PLEASE LOGIN</h3>);
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
        <h3>
          WALLET NOT DETECTED{" "}
          <a
            href="https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/"
            className="tra"
          >
            TRONLİNK
          </a>
        </h3>
      );
    }
  };
  useEffect(() => {
    axios
      .post("https://mmsellvote.vercel.app/api/mongo/getuser", {
        wadres,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      getWalletDetails();
      //wallet checking interval 2sec
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });
  async function denemuser() {
    axios
      .get("https://mmsellvote.vercel.app/api/mongo/getuser")
      .then((res) => {
        console.log(res.data);

        setUser([
          {
            walletad: res.data.data.hashUser.walletAdress,
            permlink: res.data.data.hashUser.perMLink,
            fee: res.data.data.hashUser.fee,
            voteto: res.data.data.hashUser.voteTo,
            voteWeigth: res.data.data.hashUser.voteWeigth,
            
          },
        ]);
      })
      .catch((error) => console.log(error));
  }
  async function getUserprops() {}
  return (
    <div
      data-aos="fade-right"
      className=" bg-gradient-to-r from-gray-100 to-gray-50 h-full "
    >
      <div className="  px-8 py-1 ">
        <p className="text-gray-500 text-lg">Robinia swap</p>
        <p className="font-bold text-2xl transform -translate-y-2">
          Cüzdana Bağlan
        </p>
      </div>
      <div data-aos="fade-left" className="flex   p-4 space-x-3">
        <Card title="BUSD" balance={1} icon={0} token={coins2} />
        <Card title="SBD" balance={1} icon={1} token={coins1} />
        <Card title="STEEM" balance={1} icon={2} token={coins} />
      </div>
      <div className="flex  ml-3 mt-6 space-x-6  mr-4">
        <BaseLayout>
          <div className="flex  ml-3 mt-6 space-x-6  mr-4">
            {myMessage} <br></br>
            Welcome {wadres}
            <button onClick={denemuser}>göster</button>
          </div>
          <div>
            {user.length}
            {user.map((data) => (
              <div>
                <ul key={data.walletad}>
                  
                  <li>{data.voteto}</li>
                  <li>{data.permlink}</li>
                  <li>{data.fee}</li>
                  <li>{data.voteWeigth}</li>
                
                </ul>
              </div>
            ))}
          </div>

        </BaseLayout>
        <RightBar />
      </div>
    </div>
  );
};

export default Containeruser;
