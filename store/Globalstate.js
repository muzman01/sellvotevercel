import { createContext, useEffect, useReducer } from "react";
import reducers from "./Reducers";
import axios from "axios";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    votepowerR: [],
    votweigthR: [],
    steemdlrR: [],
    sdbdlrR: [],
    busddlrR: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { votepowerR, votweigthR, steemdlrR, sdbdlrR, busddlrR } = state;
  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/api/calculation`).then((data) => {
        dispatch({ type: "VOTEPOWER", payload: data.data.lastValue });
        dispatch({ type: "VOTEWEİGTH", payload: data.data.powerw });
     
      });
    } catch (error) {
      console.log(error);
    }
    
  }, [votepowerR, votweigthR]);
  async function getCalculation() {}

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://api.coingecko.com/api/v3/coins/steem?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
  //     )
  //     .then((res) => {
  //       dispatch({
  //         type: "STEEMDLR",
  //         payload: res.data.market_data.current_price.usd,
  //       });
  //     })
  //     .catch((error) => console.log(error));

  //   axios
  //     .get(
  //       "https://api.coingecko.com/api/v3/coins/steem-dollars?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
  //     )
  //     .then((res) => {
  //       dispatch({
  //         type: "SBDDLR",
  //         payload: res.data.market_data.current_price.usd,
  //       });
  //     })
  //     .catch((error) => console.log(error));

  //   axios
  //     .get(
  //       "https://api.coingecko.com/api/v3/coins/binance-usd?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
  //     )
  //     .then((res) => {
  //       dispatch({
  //         type: "BUSDDLR",
  //         payload: res.data.market_data.current_price.usd,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
