import React, { createContext, useReducer } from "react";

const initialState: any = {
  stepIndex: 0,
  canProceed: false,
  isAuthed: false,
  contestEditMode: false,
  createSettings: {}
};

const Reducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "RESET_STEP":
      return {
        ...state,
        stepIndex: 0,
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
    case "RESET_CREATE_SETTINGS":
      return {
        ...state,
        createSettings: {}
      };
    case "SET_CREATE_SETTINGS":
      return {
        ...state,
        createSettings: { ...state.createSettings, ...action.payload }
      };
    case "SET_CAN_PROCEED":
      return {
        ...state,
        canProceed: action.payload
      };
    case "SET_CONTEST_EDIT_MODE":
      return {
        ...state,
        contestEditMode: action.payload
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
