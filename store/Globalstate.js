import { createContext, useEffect, useReducer } from "react";
import reducers from "./Reducers";
import axios from "axios";
export const DataContext = createContext();
const baseUrl = process.env.BASE_URL
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
      axios.get(`${baseUrl}/api/calculation`).then((data) => {
        dispatch({ type: "VOTEPOWER", payload: data.data.lastValue });
        dispatch({ type: "VOTEWEİGTH", payload: data.data.powerw });
     
      });
    } catch (error) {
      console.log(error);
    }
    
  }, [votepowerR, votweigthR]);



  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
