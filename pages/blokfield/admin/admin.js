import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { getData } from "@utils/fetchData";
export default function admin(data) {
  console.log(data.data);
  const [product] = useState(data.data)

  const add = process.env.ADMİN;
  const adds = process.env.ADMİNKEY;
  const [lactive, setLactive] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;

    if (add === email || adds === password) {
      toast.success("Giriş başarılı", { position: toast.POSITION.TOP_CENTER });
      setLactive(true);
    } else {
      toast.warning("Kullanıcı adı yada şifre hatalı", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  let trx;
  for (const i= 0; product.length < i; i++) {
     console.log("feee");
  }

  return (
    <>
      {lactive ? (
        <>
          <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Toplam Alınan TRX
              </h5>
            </div>
            <div class="flow-root">
              <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      {/* <Image class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        BlokField
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        wllaet adress
                      </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                     TRX 305,555
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
                          TRX 
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Oy kullanılan hesap
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Ödeme durumu:
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
                        {walletAdress.fee}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.voteTo}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {walletAdress.payState}
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

  const res = await fetch(`https://mmsellvote.vercel.app/api/mongo/getAll`);
  const events = await res.json();
  const data = events.data.hashUser
  return {
    props: {data}, // will be passed to the page component as props
  }
}