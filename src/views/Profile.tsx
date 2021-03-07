import { Link } from "react-router-dom";

export const Profile = (props: any) => {
  const { userData } = props;

  return (
  <div>
    <div>
      Hi {userData.display_name}
    </div>
    <Link to="/">GO BACK</Link>
  </div>
  )
};
