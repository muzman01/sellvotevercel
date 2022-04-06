import { Header, Sidebar, RightBar,Footer } from "@components/ui/common";
import { AboutContainer } from "@components/ui/linkspage";

import { BaseLayout } from "@components/ui/layout";
export default function About() {
  return (
    <>
      <div>
        <div className="flex w-screen h-screen" style={{ width: "100%", maxHeight:"100%" }}>
          <Sidebar />
          <div className="w-screen ">
            <Header />
            <AboutContainer />
            <Footer />
          </div>
        </div>
     
      </div>
    </>
  );
}

About.Layout = BaseLayout;
