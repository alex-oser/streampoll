import { useReducer } from "react"; 

export function useSection() {
  // we have to define the initial state of the component's state
  const initialState = { section: "home" }

  // this function will determine how the state is updated
  function reducer(state: {}, action: { type: string, value: string }) {
    switch(action.type) {
      case 'SET':
        return { section: action.value }
      default:
        return state
    }
  }

  // inside your component, initialize your state like so
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [buttonState, dispatch] = useReducer(reducer, initialState);
  return [buttonState, dispatch];

}