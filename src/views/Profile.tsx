import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserData } from "../types/UserData";

export const Profile = ({ userData }: { userData: UserData | null } ) => {

  return (
    <div className="container">
      <Typography color="textPrimary" variant="h4">Profile</Typography>
      
      <pre style={{ color: "#fff" }}>{JSON.stringify(userData, null, 2)}</pre> 

      <Link to="/">
        <Button variant="contained" color="primary">Go home</Button>
      </Link>
    </div>
  );
};
