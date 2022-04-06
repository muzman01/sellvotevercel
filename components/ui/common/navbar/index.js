import React from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import LayersIcon from "@material-ui/icons/Layers";
import LockIcon from "@material-ui/icons/Lock";
import EcoIcon from "@material-ui/icons/Eco";
import Flag from "@material-ui/icons/Flag";
import Link from "next/link";
import { withTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import Image from "next/image";

const Sidebar = () => {
  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <div
      className="md:w-3/12 w-6/12 h-screen"
      style={{ height: "100%" }}
    >
      <div className=" border-b py-3 mt-1 flex justify-around ">
      <div class="mb-6 md:mb-0">
            <a href="/" class="flex items-center">
                <img src="/assets/bfmain.png" class="mr-3 h-8" alt="BlokField" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlokField</span>
            </a>
        </div>
        <p>|</p>
        <p className="text-gray-400 text-lg">wallet</p>
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-4">
          <h1 className="text-gray-400">Menu</h1>
          <div className="">
            <Link href="/">
              <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                <Image src="/assets/home.png" width={25} height={25} />

                <a>
                  {" "}
                  <p className=" ">{i18n.t("Home")}</p>
                </a>
              </div>
            </Link>
          </div>
          <div className="">
            <Link href="/about">
              <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                <Image src="/assets/ab.png" width={25} height={25} />

                <a>
                  {" "}
                  <p className="text-gray-600  ">{i18n.t("About Us")}</p>
                </a>
              </div>
            </Link>
          </div>

          <div className="">
            <Link href="/sellvote">
              <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                <Image src="/assets/aaa.png" width={30} height={30} />

                <a>
                  {" "}
                  <p className="text-gray-600  ">{i18n.t("Buy Vote")}</p>
                </a>
              </div>
            </Link>
          </div>
          <div className="">
            <Link href="/user">
              <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                <Image src="/assets/trans.png" width={25} height={25} />

                <a>
                  {" "}
                  <p className="text-gray-600  ">{i18n.t("My transactions")}</p>
                </a>
              </div>
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
              {i18n.language == "en" ? (
                <>
                  <div
                    className="byr"
                    style={{}}
                    onClick={() => onChangeLanguage("tr")}
                  >
                    <Image src="/assets/trbr.jpg" width={25} height={25} />{" "}
                  
                  <span className="absolute ml-3">Türkçe</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="byr"
                    style={{}}
                    onClick={() => onChangeLanguage("en")}
                  >
                    {" "}
                    <Image src="/assets/en.png" width={25} height={25} />{" "}
                  
                  <span className="absolute ml-3">English</span>{" "}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Sidebar);
