import React, { useEffect, useState } from "react";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import { tokens } from "../../../../public/token";
import { injected } from "@components/connector";
import axios from "axios";
import abi from "../../../../public/abi.json";
const Header = ({ address }) => {
  const [blc, setBlc] = useState(0);

  const { active, account, library, connector, chainId, activate, deactivate } =
    useWeb3React();
  const web3 = new Web3(library);
  async function postLink() {
    try {
      await axios
        .post("http://localhost:3000/api/transications", {
          account,
        })
        .then((data) => {
          console.log(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }
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
    if (active) {
      let accounts = await web3.eth.getAccounts();

      for (let tokenAddress of tokens) {
        const contract = new web3.eth.Contract(abi, tokenAddress);
        const tokenBalance = await contract.methods
          .balanceOf(accounts[0])
          .call();
        setBlc(tokenBalance / 10 ** 18);
      }
    }
  }

  async function paidBusd() {
    const tokenAddress = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
    const contract = await new web3.eth.Contract(abi, tokenAddress);
    const tokenBalance = await contract.methods.balanceOf(account).call();
    console.log(`BUSD balance: ${tokenBalance / 10 ** 18}`);
    const tokenCount = tokenBalance / 10 ** 18;
    setBlc(tokenCount);
    if (chainId === 97 && tokenCount > 0) {
      const gasPrice = await web3.eth.getGasPrice();
      const tokenTransferResult = await contract.methods
        .transfer(
          "0xBd87Afe44d68907285C32e7E82A132346c8Cb6DC",
          web3.utils.toWei("1", "ether")
        )
        .send({
          from: account,
          gasPrice,
        });
      console.log(tokenTransferResult);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="flex shadow-sm bg-gray-50  p-4 justify-between ">
      <div className="flex space-x-3  ">
        {active ? (
          <>
            <p className="text-gray-400">Adress </p>
            <p>{account.substring(0, 5)}</p>
            <p className="text-gray-400">Balance </p>
            <p>{blc} BUSD</p>
            <div className="flex space-x-2 text-gray-400 mr-5 float-left">
              <ExitToAppIcon />
              <button
                className="text-gray-600 font-semibold"
                onClick={disconnect}
              >
                Exit
              </button>
            </div>
          </>
        ) : (
          <button
            className="text-gray-400 hover:text-blue-600 "
            onClick={connect}
          >
            Cüzdana Bağlan{" "}
          </button>
        )}
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
