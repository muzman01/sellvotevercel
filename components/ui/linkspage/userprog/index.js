import React, { useEffect, useState } from "react";

import { injected } from "@components/connector";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import AOS from "aos";
import "aos/dist/aos.css";

import { BaseLayout } from "@components/ui/layout";
import { Card } from "@components/ui/order";
import { RightBar } from "@components/ui/common";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

import i18n from "../../../../i18n";
const baseUrl = process.env.BASE_URL;
const Containeruser = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [product, setProduct] = useState([]);
  const [coins, setCoins] = useState([]);
  const [coins1, setCoins1] = useState([]);
  const [coins2, setCoins2] = useState([]);

  const [wadres, setWadres] = useState();
  const [userAdress, setUserAdress] = useState(" ");

  const [clicked, setClicked] = useState(false);

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
        "https://api.coingecko.com/api/v3/coins/binance-usd?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
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


  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      setWadres(account);
      axios
        .post(`${baseUrl}/api/mongo/getuser`, {
          account,
        })
        .then((res) => {
          setUserAdress(res.data.data.wadres);
        })
        .catch((error) => console.log(error));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  async function denemuser() {
   
    axios
      .get(`${baseUrl}/api/mongo/getuser?wadres=${wadres}`)
      .then((res) => {
        setProduct(res.data.data.hashUser);

      
      })
      .catch((error) => console.log(error));
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
        <Card title="BUSD" balance={1} icon={0} token={coins2} />
        <Card title="SBD" balance={1} icon={1} token={coins1} />
        <Card title="STEEM" balance={1} icon={2} token={coins} />
      </div>
      <div className="flex  ml-3 mt-6 space-x-6  mr-4">
        <BaseLayout>
          {userAdress === " " ? (
            <>{myMessage}</>
          ) : (
            <>
              Welcome: {userAdress}
              <button
                onClick={denemuser}
                disabled={clicked}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 mt-2 ml-5 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Refresh
              </button>{" "}
            </>
          )}
          <div>
            {userAdress === undefined ? (
              <>
                <h1 className="mt-11 text-green-700 text-5xl text-center">
                  {i18n.t("There is no previous transaction.")}
                </h1>
              </>
            ) : (
              <>
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
                                {i18n.t("Vote weight")}
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                {i18n.t("Permlink")}
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                {i18n.t("BUSD")}
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                {i18n.t("Voted account")}
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                {i18n.t("hash")}
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                {i18n.t("Payment status")}
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                {i18n.t("Voting status")}
                              </th>
                            </tr>
                          </thead>

                          {product.map((walletAdress) => (
                            <tbody key={walletAdress._id}>
                              <tr className="border-b" key={walletAdress._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {walletAdress.hash}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 text-center whitespace-nowrap">
                                  {walletAdress.payState ? (
                                    <p className="border-b bg-green-100 border-green-200">
                                      {i18n.t("Paid")}
                                    </p>
                                  ) : (
                                    <p className="border-b bg-red-100 border-red-200">
                                      {i18n.t("not paid")} |{" "}
                                      <button className="text-green-600">
                                        Ödeme yap
                                      </button>
                                    </p>
                                  )}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 text-center whitespace-nowrap">
                                  {walletAdress.voteState ? (
                                    <p className="border-b bg-green-100 border-green-200">
                                      {i18n.t("Voted")}
                                    </p>
                                  ) : (
                                    <p className="border-b bg-red-100 border-red-200">
                                      {i18n.t("Error")} |{" "}
                                      <button className="text-green-600">
                                        {i18n.t("Vote")}
                                      </button>
                                    </p>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
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
