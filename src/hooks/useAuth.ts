import { useEffect, useState } from "react";
import { UserData } from "../types/UserData"

export const useAuth = () => {
  const [userData, setUserData] = useState<UserData|null>(null);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setUserData(res);
        }
      });
  }, []);

  return userData;
};
