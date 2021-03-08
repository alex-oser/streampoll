import "./style.css";

const { REACT_APP_COMMIT_SHA = "kappa" } = process.env;

export const Footer = () => {
  const build = REACT_APP_COMMIT_SHA.substr(-7);

  return (
    <div className="footer">
      {build}
    </div>
  );
};
