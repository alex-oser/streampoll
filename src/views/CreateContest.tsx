import { useContext } from "react";
import { Context } from "../store";

export const CreateContest = () => {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, dispatch] = useContext(Context);

  return (
    <h2 onClick={() => dispatch({ type: "SET_SECTION", payload: "home" })}>
      GO BACK
    </h2>
  );
};
