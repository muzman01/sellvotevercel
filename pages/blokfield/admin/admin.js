import React from "react";
import { useState ,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
const baseUrl = process.env.BASE_URL

export default function admin(data) {

  const [coins2, setCoins2] = useState([]);
  const [product] = useState(data.data)
 
  const add = process.env.ADMİN;
  const adds = process.env.ADMİNKEY;
  const [lactive, setLactive] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('email') === add || localStorage.getItem('password') === adds){
      setLactive(true)
    }
  },[])
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;
    let data ={
      email:email,
      password:password
    }
   
    if (add === email || adds === password) {
      localStorage.setItem('email', `${email}`);
      localStorage.setItem("password", `${password}`);
      toast.success("Giriş başarılı", { position: toast.POSITION.TOP_CENTER });
      setLactive(true);
    } else {
      toast.warning("Kullanıcı adı yada şifre hatalı", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/binance-usd?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
      )
      .then(res => {
        setCoins2(res.data.market_data.current_price.usd);
      
      })
      .catch(error => console.log(error));
  }, []);
  let trx;
  let i;
  // for (i = 0; i < product.length; i++) {
    
  //   trx = data.data[i].fee
  //   console.log(trx);
  // }
  
  let accounts = [data.data.length];
  let delSp = [data.data.length];
let totalSp = 0;

 

  for (i = 0; i < data.data.length; i++) {
    accounts[i] = data.data[i].perMLink;
    delSp[i] = data.data[i].fee;


  }
  for (i = 0; i < delSp.length; i++) {
    totalSp += delSp[i];
  
  }

 let trxyeni = totalSp.toFixed(2)
 let dlr = totalSp / coins2
  return (
    <>
      {lactive ? (
        <>
          <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Total BUSD | $
              </h5>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {/* <Image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        BlokField
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        wllaet adress
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                     BUSD {trxyeni}
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                     $ {dlr.toFixed(2)}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Wallet id:
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Permlink
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Vote Weight
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          BUSD 
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Voted Account
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Payment Status
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Payment Time
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Voting status
                        </th>
                      </tr>
                    </thead>
                    {console.log(product)}
                    {product.map((walletAdress) => (
                    <tbody>
                      
                        <tr className="border-b" key={walletAdress._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" >
                          {walletAdress.walletAdress}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.perMLink}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.voteWeigth}%
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.fee}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.voteTo}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.payState ? (
                          <p className="border-b bg-green-100 border-green-200">Paid</p>
                        ): (<p className="border-b bg-red-100 border-red-200">ödenmedi</p>)}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.processTime}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 text-center whitespace-nowrap">
                        {walletAdress.voteState ? (
                          <p className="border-b bg-green-100 border-green-200">Voted</p>
                        ): (<p className="border-b bg-red-100 border-red-200">Not Voted | </p>)}
                        </td>
                      </tr>
                   
                       {/* {product.map((walletAdress) => (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {walletAdress.walletAdress}
                      </td>
                    ))} */}
                    </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
       
        </>
      ) : (
        <>
          <div className="h-screen flex bg-gray-bg1">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
              <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
                Log in to BlokField account 🔐
              </h1>

              <form onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="email">Display Name</label>
                  <input
                    type="text"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                    id="email"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                    id="password"
                    placeholder="Your Password"
                  />
                </div>

                <div className="flex justify-center items-center mt-6">
                  <button
                    className={`bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export async function getServerSideProps() {

  const res = await fetch(`${baseUrl}/api/mongo/getAll`);
  const events = await res.json();
  const data = events.data.hashUser
  return {
    props: {data}, // will be passed to the page component as props
  }
}