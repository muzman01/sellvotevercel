import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import i18n from "../../../../i18n";
import { withTranslation } from "react-i18next";
const baseUrl = process.env.BASE_URL;
const data = {
  labels: [],
  datasets: [
    {
      data: [10, 100],
      backgroundColor: [" rgba(67, 56, 202)", "rgba(229, 231, 235)"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB"],
    },
  ],
};
import { DataContext } from "../../../../store/Globalstate";
const RightBar = () => {
  const { state, dispatch } = useContext(DataContext);
  const [yeniGuc, setYeniGuc] = useState([]);

  const [loading,setLoading] = useState(false)
  useEffect(() => {
    setYeniGuc(state?.votweigthR)
  }, [state]);
  return (
    <div className="bg-white  w-2/6 rounded-xl border border-gray-100">
      <div className="border-b p-3 border-gray-100">
        <p className="font-semibold  ">BlokField Robinia Voting Power </p>
      </div>
      <div className="flex flex-col items-center p-3">
        <p className="font-semibold text-lg text-gray-800"> 2s</p>
        <p className="text-gray-600 text-sm"> {i18n.t("The last update")} </p>
      </div>

      <div className="p-4  flex items-center justify-center">
        <div className="skill">
          <div className="outer">
            <div className="inner">
              <div id="number">{ loading ? 'Loading...':`${yeniGuc} %`}</div>
            </div>
          </div>
        </div>
        <div className="svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="160px"
            height="160px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#673ab7" />
              </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center p-3">
        {Number(yeniGuc) < 60 ? (
          <p className="text-gray-600 text-sm text-center">
            {i18n.t('You cant buy Upvote!')}
          </p>
        ) : (
          <p className="text-gray-600 text-sm text-center">
            { i18n.t('You can buy Upvote!')}
          </p>
        )}
      </div>
    </div>
  );
};

export default withTranslation()(RightBar);
