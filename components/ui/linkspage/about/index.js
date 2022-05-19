import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { BaseLayout } from "@components/ui/layout";
import { Card } from "@components/ui/order";
import { Footer, RightBar } from "@components/ui/common";
import { withTranslation } from "react-i18next";
import i18n from "../../../../i18n";

const AboutContainer = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [coins, setCoins] = useState([]);
  const [coins1, setCoins1] = useState([]);
  const [coins2, setCoins2] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/steem?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/steem-dollars?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => {
        setCoins1(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/binance-usd?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
      )
      .then((res) => {
        setCoins2(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div
      data-aos="fade-right"
      className=" bg-gradient-to-r from-gray-100 to-gray-50  pb-4"
    >
      <div className="  px-8 py-1 ">
        <p className="text-gray-500 text-lg">BlokField About</p>
      </div>

      <div className="flex content-center  ml-48 mt-6 space-x-6  mr-4  ">
        <BaseLayout>
          <div className="flex  ml-3 mt-6 space-x-6  mr-4 text-center items-center">
            <p className="">
              <br></br>
              <h1 className="text-5xl font-bold">BlokField</h1>
              <br></br>
              {i18n.t(
                'Blokfield, a company specializing in blockchain technology, is taking the lead in continuous innovation in the fields of DeFi, Game and Reits after a long business preparation period. We provide customers with a more efficient crypto asset management service with unprecedented attempts and technologies. We are growing into a company that pursues safe and continuous service trough more communication and gradual service improvement than any other company.'
              )}
              <br></br>
              <br></br>
              <h1 className="text-3xl font-bold">{i18n.t('What We Do ?')}</h1>
              <br></br>

              <ul className="relative">
                <li className="mt-4 item-center text-center">
                  {i18n.t(
                    "[Defi 1.0] Robinia Swap is a Yield Farm Defi service running on the BSC chain , and various complementary systems have been added to control token economy and inflation."
                  )}
                </li>
                <li className="mt-4  item-center text-center">
                  {i18n.t(
                    "[Defi 2.0] Wisteria Swap is the first Defi 2.0 model that maintains the yield farming system. It is as safe as using verified contracts , audited by Techrate , and features more than 6 deflation mechanisms."
                  )}
                </li>
                <li className="mt-4  item-center text-center">
                  {i18n.t(
                    "[Game ] It is an economic strategy simulation SRPG genre in the background of the Middle Ages, and it can be played without downloading anywhere in the world through a fair blockchain reward system using the game money (Gold) system."
                  )}
                </li>
                <li className="mt-4  item-center text-center">
                  {i18n.t(
                    "[Defi 1.5] RobiniaSwap V2 is a DeFi 1.0 service, but it is a DeFi 1.5 service model that utilizes the strengths of the DeFi 2.0 service. Since the protocol is responsible for most of the liquidity supply, stable service operation is possible even if users do not proceed with the RV2 liquidity supply, a governance token."
                  )}
                </li>
                <li className="mt-4  item-center text-center">
                  {i18n.t(
                    '[Reits] ReitsDAO is a service operated by Blokfield.Inc a decentralized real estate investment product linked to real assets in the BSC blockchain network service. ReitsDAO issues "RDF" tokens composed of real estate value as collateral and "RDF" is designed to include all real estate values owned by ReitsDAO and revenue generated from real estate.'
                  )}
                </li>
              </ul>
              <br></br>
              <br></br>
              <h1 className="text-3xl font-bold">{i18n.t("Contact")}</h1>
              <br></br>

              {i18n.t(
                "We are always on the lookout for questions , business partnerships and offers regarding Blokfield projects."
              )}
              <br></br>

              <span className="border-b border-blue-600 text-blue-600 -mt-5">
                {i18n.t("contact@blokfield.io")}
              </span>

              <br></br>
              <br></br>
            </p>
          </div>
        </BaseLayout>
      </div>
    </div>
  );
};

export default withTranslation()(AboutContainer);

