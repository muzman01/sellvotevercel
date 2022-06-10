import { Header, Sidebar, Footer } from "@components/ui/common";
import { Containeruser } from "@components/ui/linkspage";
import { BaseLayout } from "@components/ui/layout";
export default function User() {
  return (
    <>
      <div>
        <div className="flex w-screen h-screen" style={{ maxWidth: "100%" }}>
          <Sidebar />
          <div className="w-screen ">
            <Header />
            <Containeruser />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

User.Layout = BaseLayout;
