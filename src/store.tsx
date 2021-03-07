import React, { createContext, useReducer } from "react";

const initialState: any = {
  section: "home",
};

const Reducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "SET_SECTION":
      return {
        ...state,
        section: action.payload,
      };
    default:
      return state;
  }
};

const Store = ({ children }: { children: React.ReactChild }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export { Store };
