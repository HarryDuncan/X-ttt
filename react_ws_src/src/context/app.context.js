
import React, { createContext, useReducer,  useContext } from "react";
import { spreadOperator } from "../helpers/spreadOperator";

const AppContext = createContext(undefined);

const initialState = {
 username : null,

};

const reducer = (state, action) => {
  switch (action.type) {

    case 'LOGIN':{
        const {username} = action.payload
        return spreadOperator(state, {username})
    }
    case 'LOGOUT':{
      return initialState
    }
   
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};

export { AppProvider, useAppContext };
