import React, { useEffect, useState } from "react";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import { injected } from "@components/connector";


import { withTranslation } from "react-i18next";
import i18n from "../../../../i18n";

const Header = ({ address }) => {

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };



  const [enadled, setEnabled] = useState("");
  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  };

  const [bsdblance, setBsdbalance] = useState("");
  const { active, account, library, connector, chainId, activate, deactivate } =
    useWeb3React();
  const web3 = new Web3(library);

  async function connect() {
    const mask = await ethEnabled();
    if (!mask) {
      setEnabled(
        <h3 className="text-red-500">
          {i18n.t("WALLET NOT DETECTED")}
          <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            className="text-blue-700 ml-2"
          >
            METAMASK
          </a>
        </h3>
      );
    } else {
      try {
        await activate(injected);
        localStorage.setItem("isWalletConnected", true);
        localStorage.setItem("walletAdress",`${account}`)
        setEnabled("");
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  async function disconnect() {
    try {
      await deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }
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




  return (
    <div className="flex shadow-sm bg-gray-50  p-4 justify-between ">
      <div className="flex space-x-3  ">
        {enadled === "" && (
          <>
            <p className="text-gray-400">Adress: </p>
            <p>{account} </p>

            {active ? (
              <>
                <div
                  className="flex space-x-2 text-gray-400 mr-5 float-left"
                  style={{ cursor: "pointer" }}
                  onClick={disconnect}
                >
                  <ExitToAppIcon />
                  <p>exit</p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex space-x-2 text-blue-400 mr-5 float-left"
                  style={{ cursor: "pointer" }}
                  onClick={connect}
                >
                  <ExitToAppIcon />
                  <p>connect wallet</p>
                </div>
              </>
            )}
          </>
        ) }
        {enadled}
      </div>
    </div>
  );
};
export async function getStaticProps() {
  return {
    props: {
      address: "0xBd87Afe44d68907285C32e7E82A132346c8Cb6DC",
    },
  };
}

export default withTranslation()(Header);
