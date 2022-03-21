import { Header, RightBar, Middle } from "@components/ui/common";
import { Card } from "@components/ui/order";
import Notify from "@components/message/Notify";

export default function BaseLayout({ children }) {
  return (
    <>
      <div
        data-aos="flip-down"
        className=" bg-white ml-2   shadow-sm w-8/12 border rounded-xl border-gray-100"
      >
        <Notify />
        {children}
      </div>
    </>
  );
}
