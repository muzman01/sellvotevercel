import { Header, Sidebar, RightBar } from "@components/ui/common";
import { AboutContainer } from "@components/ui/linkspage";

import { BaseLayout } from "@components/ui/layout";
export default function About() {
  return (
    <>
      <div>
        <div className="flex w-screen h-screen" style={{ maxWidth: "100%" }}>
          <Sidebar />
          <div className="w-screen ">
            <Header />
            <AboutContainer />
          </div>
        </div>
      </div>
    </>
  );
}

About.Layout = BaseLayout;
