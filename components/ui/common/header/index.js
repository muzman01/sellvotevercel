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
const Header = ({ address }) => {
//   const [blc, setBlc] = useState(0);
//   const [myDetails, setMyDetails] = useState({
//     name: 'none',
//     address: 'none',
//     balance: 0,
//     frozenBalance: 0,
//     network: 'none',
//     link: 'false',
//   });
//   const [cactive, setCactive] = useState("");
//   const [tAdres,setTAdres] = useState("");
  
//   const getBalancee = async () => {
//     //if wallet installed and logged , getting TRX token balance
//     if (window.tronWeb && window.tronWeb.ready) {
//       let walletBalances = await window.tronWeb.trx.getAccount(
//         window.tronWeb.defaultAddress.base58
//       );
//       setBlc(walletBalances)
//       return walletBalances;
//     } else {
//       return 0;
//     }
//   };
//   async function postLink() {
//     try {
//       await axios
//         .post("http://localhost:3000/api/transications", {
//           account,
//         })
//         .then((data) => {
//           console.log(data.data);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async function connect() {
   
//     if (window.tronWeb) {
//       //checking if wallet injected
//       if (window.tronWeb.ready) {
//         let tronweb = window.tronWeb;
//         let tempBalance = await getBalancee();
//         let tempFrozenBalance = 0;

//         if (!tempBalance.balance) {
//           tempBalance.balance = 0;
//         }
//         const tadres = tempBalance.__payload__.address;
//         setTAdres(tadres)
//         let signedTx = tronweb.trx.sign(tadres);
//         signedTx.then(function(result) {
//           if(result){
//             toast.success("Giriş işlemi başarılı", {
//               position: toast.POSITION.TOP_CENTER,
//             });
//             setCactive(result) // "Some User token"
//           }
          
//        })
      
//         // setMyDetails({
//         //   name: window.tronWeb.defaultAddress.name,
//         //   address: window.tronWeb.defaultAddress.base58,
//         //   balance: tempBalance.balance / 1000000,
//         //   frozenBalance: tempFrozenBalance / 1000000,
//         //   network: window.tronWeb.fullNode.host,
//         //   link: 'true',
//         // });
//       } else {
//         //we have wallet but not logged in
//         console.log("lütfen cüzdana bağlanın");
//         toast.warn("Tronlinke bağlanılmadı", {
//           position: toast.POSITION.TOP_CENTER,
//         });
        
//       }
//     } else {
//       //wallet is not detected at all
//       toast.warn("Lütfen tronlinki ekleyin", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//     }

// }

//   useEffect(() => {
//     getBalancee();
//   }, []);

  return (
    <div className="flex shadow-sm bg-gray-50  p-4 justify-between ">
      <div className="flex space-x-3  ">

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
