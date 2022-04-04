import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import TronWeb from "tronweb"
import { tokens } from "../../../../public/token";
import { injected } from "@components/connector";
import axios from "axios";
import abi from "../../../../public/abi.json";
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
import i18n from '../../../../i18n';
const Header = ({ address }) => {
  const onChangeLanguage =  language =>{
        
    i18n.changeLanguage(language);
}
const [myMessage, setMyMessage] = useState(<h3> LOADING.. </h3>);
const [myDetails, setMyDetails] = useState({
  name: 'none',
  address: 'none',
  balance: 0,
  frozenBalance: 0,
  network: 'none',
  link: 'false',
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
      setMyMessage(<h3>{i18n.t('WALLET CONNECTED')}</h3>);
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
      setMyMessage(<h3>WALLET DETECTED PLEASE LOGIN</h3>);
      setMyDetails({
        name: 'none',
        address: 'none',
        balance: 0,
        frozenBalance: 0,
        network: 'none',
        link: 'false',
      });
    }
  } else {
    //wallet is not detected at all
    setMyMessage(<h3>WALLET NOT DETECTED <a href="https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/" className="tra">TRONLİNK</a></h3>);
  }
};

useEffect(() => {
  const interval = setInterval(async () => {
    getWalletDetails();
    //wallet checking interval 2sec
  }, 2000);
  return () => {
    clearInterval(interval);
  };
});
  return (
    <div className="flex shadow-sm bg-gray-50  p-4 justify-between ">
      <div className="flex space-x-3  ">
      <>
      {myMessage}
            <p className="text-gray-400">Adress </p>
            <p>{myDetails.address}</p>
            <p className="text-gray-400">Balance </p>
            <p>{myDetails.balance} BUSD</p>
            <div className="flex space-x-2 text-gray-400 mr-5 float-left">
              <ExitToAppIcon />
              <p>Account Name: {myDetails.name} </p>
            </div>
          </>
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

export default Header;
