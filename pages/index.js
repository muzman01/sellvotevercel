import { Header, Sidebar, Footer } from "@components/ui/common";
import { Containerhome } from "@components/ui/linkspage";
import { React, } from "react";
import { BaseLayout } from "@components/ui/layout";

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
      <div className=" mobildvc">
        <div className="flex w-screen h-screen " style={{ maxWidth: "100%" }}>
          <Sidebar />

          <div className="w-screen  mobildvc">
            <div className="mld">
              <div className="rr">
                <Image src="/assets/bfmain.png" width={300} height={300} />
                <br></br>
                <br></br>
                <br></br>
                <span
                  className="mdyazi"
                  style={{
                    color: "#35d6a9",
                    fontWeight: "600",
                    fontSize: "30px",
                  }}
                >
                  {" "}
                  mobile device is not supported.{" "}
                </span>
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
