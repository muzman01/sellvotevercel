import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/loading.css"
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "aos/dist/aos.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { DataProvider } from "../store/Globalstate";
import { BrowserRouter } from 'react-router-dom';
import Head from "next/head";
<Head>
<title>BlokField sellvote</title>
<meta name="description" content="BlokField sellvote" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" href="/assets/bfmain.png" />
</Head>
function getLibrary(provider) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ToastContainer />
        <Component {...pageProps} />
      </Web3ReactProvider>
    </DataProvider>
  );
}

export default MyApp;
