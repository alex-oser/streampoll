import { useEffect, useState } from "react";

export const useAuth = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("response is " + JSON.stringify(res));
        if (!res.error) {
          setUserData(res);
        }
      });
  }, []);

  return userData;
};
