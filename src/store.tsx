import React, { createContext, useReducer } from "react";

const initialState: any = {
  section: "home",
  stepIndex: 0,
};

const Reducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "SET_SECTION":
      return {
        ...state,
        section: action.payload,
      };
    case "NEXT_STEP":
      return {
        ...state,
        stepIndex: state.stepIndex + 1,
      };
    case "PREV_STEP":
      return {
        ...state,
        stepIndex: state.stepIndex - 1,
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
