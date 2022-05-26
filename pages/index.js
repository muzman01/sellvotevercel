import { Header, Sidebar, RightBar, Footer } from "@components/ui/common";
import { Containerhome } from "@components/ui/linkspage";
import { React, useState, useEffect } from "react";
import { BaseLayout } from "@components/ui/layout";
import Web3 from "web3";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>BlokField sellvote</title>
        <meta name="description" content="BlokField sellvote" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/bfmain.png" />
      </Head>
      <div className="mobildvc">
        <div
          className="flex w-screen h-screen mobildvc"
          style={{ maxWidth: "100%" }}
        >
          <div  className="mlbd">
          <Sidebar />
          </div>
         
          <div className="w-screen  mobildvc">
            <div className="mld">
              <div className="rr">
                <Image src="/assets/bfmain.png" width={300} height={300} />
                <br></br>
                <br></br>
                <br></br>
                <span className="mdyazi"  style={{ color:"#35d6a9", fontWeight:"600",fontSize:"30px" }}> deneme yazı </span>
              </div>
            </div>
            <div className="mlbd">
              <Header />
              <Containerhome />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Home.Layout = BaseLayout;
