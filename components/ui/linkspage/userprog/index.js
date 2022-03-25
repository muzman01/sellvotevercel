import React, { useEffect, useState } from "react";
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

const Containeruser = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [coins, setCoins] = useState([]);
  const [coins1, setCoins1] = useState([]);
  const [coins2, setCoins2] = useState([]);
  const [user, setUser] = useState();
  const [box,setBox] = useState([]);
  const [wadres, setWadres] = useState();
  const [perm, setPerm] = useState();
  const [voteto, setVoteto] = useState();
  const [time,setTime] = useState();
  const [pay,setPay] = useState();
  const [weigty,setWeigth] = useState();
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
  
  const { active, account, library, connector, chainId, activate, deactivate } =
    useWeb3React();
  const web3 = new Web3(library);

  const walletAdress = account;

  async function connect() {
    try {
      await activate(injected);
 
    } catch (ex) {}
 
  }
 async function checked(e){
  if (e.target.checked) {
    setBox(e.target.checked);
         try {
           axios
            .post("https://sellvotevercel.vercel.app/api/mongo/getuser", {
            account
            })
            .then((data) => {
              console.log(data.data);
            });
        } catch (error) {
          console.log(error);
        }
}else{

  setBox(e.target.checked);
}
 }
function göster(){
    try {
        axios
         .get("https://sellvotevercel.vercel.app/api/mongo/getuser")
         .then((data) => {
           console.log(data.data);
           setUser(data)
           setPay(data.data.payState);
           setPerm(data.perMLink);
           setTime(data.data.processTime);
           setWeigth(data.data.voteWeigth);
           setWadres(data.data.walletAdress);
           setVoteto(data.data.voteTo);
         });
         console.log(pay,"pay");
     } catch (error) {
       console.log(error);
     }
}
  //   useEffect(() => {
 
  //   }, []);
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
            {active ? (
              <>
                    <span>
                      {account.substring(0, 10)} sen misin?
                      <input
                        className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-2 align-top bg-no-repeat bg-center bg-contain float-right mr-2 cursor-pointer"
                        name="isGoing"
                        type="checkbox"
                        onChange={checked}
                      />
                    </span>
                    {box ?
                    <>
                    <button onClick={göster}>göster</button> 
                    <br></br>
                    <h1>{pay}</h1>
                    </>
                    : " "}
                
              </>
            ) : (
              <>
                <button onClick={connect}>Cüzdana bağlan</button>
              
            
           
              </>
            )}
          </div>
        </BaseLayout>
        <RightBar />
      </div>
    </div>
  );
};

export default Containeruser;
