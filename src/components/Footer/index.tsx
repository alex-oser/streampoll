import { useContext } from "react";
import { Context } from "../../store";

const { REACT_APP_BUILD_INFO } = process.env;

export const Footer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  return (
    <pre style={{ position: "fixed", bottom: 20, color: "#fff " }}>
      {state.section} - {REACT_APP_BUILD_INFO}
    </pre>
  );
};
