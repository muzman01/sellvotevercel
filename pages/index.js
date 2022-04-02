import { Header, Sidebar, RightBar } from "@components/ui/common";
import { Containerhome } from "@components/ui/linkspage";
import { React, useState, useEffect } from 'react';
import { BaseLayout } from "@components/ui/layout";
export default function Home() {

  return (
    <>
      <div>
        <div className="flex w-screen h-screen" style={{ maxWidth: "100%" }}>
          <Sidebar />
          <div className="w-screen ">
            <Header />
            <Containerhome />
          </div>
        </div>
      </div>
    </>
  );
}

Home.Layout = BaseLayout;
