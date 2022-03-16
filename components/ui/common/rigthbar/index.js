import React from 'react'

import dolar from '../../../../dolar.json'
const data = {
    labels: [

    ],
    datasets: [{
        data: [10, 100],
        backgroundColor: [
            ' rgba(67, 56, 202)',
            'rgba(229, 231, 235)',

        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',

        ]
    }]
};


const RightBar = () => {
    let oyGucu = dolar.sonuc;
    let yeniGuc = parseFloat(oyGucu).toFixed(2)
    return (
        <div className="bg-white  w-2/6 rounded-xl border border-gray-100">
            <div className="border-b p-3 border-gray-100">
                <p className="font-semibold  ">Robina swap </p>
            </div>
            <div className="flex flex-col items-center p-3">
                <p className="font-semibold text-lg text-gray-800" > 51s önce</p>
                <p className="text-gray-600 text-sm">Son güncelleme </p>
            </div>

            <div className="p-4  flex items-center justify-center">

                {/* <div className="flex justify-center items-center     h-48 w-48   rounded-full" style={{ borderWidth: "16px" }} >
                    <div className="flex justify-center items-center  border-gray-200 h-44 w-44 rounded-full ">
                        <div className=" flex flex-col justify-center items-center shadow-2xl h-32 w-32 rounded-full  ">
                            <p className="text-gray-800 font-semibold"> 140$ </p>
                            <button className="text-blue-700 font-semibold text-sm"> Claim Now</button>

                        </div>

                    </div>
                </div> */}
                <div className='skill'>
                    <div className='outer'>
                        <div className='inner'>
                            <div id='number'>
                                {yeniGuc}$
                            </div>
                        </div>
                    </div>
                </div>
                    <div className='svg'>
                     <svg  xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
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
                <p className="text-gray-600 text-sm text-center"> Upvote satın alabilirsin</p>
            </div>
        </div>
    )
}

export default RightBar
