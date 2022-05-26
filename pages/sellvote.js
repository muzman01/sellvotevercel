import { Header, Sidebar, RightBar, Footer } from "@components/ui/common";
import { SellvoteContainer } from "@components/ui/linkspage";

import { BaseLayout } from "@components/ui/layout";
export default function SellVote() {
  return (
    <>
      <div className="mobildvc">
        <div
          className="flex w-screen h-screen"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          <Sidebar />
          <div className="w-screen ">
            <Header />
            <SellvoteContainer />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

SellVote.Layout = BaseLayout;
