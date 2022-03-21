import {createContext, useReducer} from 'react'
import reducers from './Reducers'

export const DataCentext = createContext()

export const DataProvider = ({children}) =>{
    const initialState ={notify:{}, auth:{}}
    const [state, dispatch] = useReducer(reducers,initialState)
    return(
        <DataCentext.Provider value={{state, dispatch}}>
            {children}
        </DataCentext.Provider>
    )
}