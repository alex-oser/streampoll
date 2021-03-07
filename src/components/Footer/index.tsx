
const { REACT_APP_BUILD_INFO } = process.env;

export const Footer = () => (
  <pre style={{ position: "fixed", bottom: 20, color: "#fff " }}>
    {REACT_APP_BUILD_INFO}
  </pre>
);
