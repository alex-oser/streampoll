import { useContext } from "react";
import { Context } from "../../store";
import "./style.css";

const { REACT_APP_BUILD_INFO } = process.env;

export const Footer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  return (
    <div className="footer">
      {state.section} - {REACT_APP_BUILD_INFO}
    </div>
  );
};
