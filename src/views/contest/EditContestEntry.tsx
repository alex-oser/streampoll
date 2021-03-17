import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { ContestEntry } from "./ContestEntry";

export const EditContestEntry = (props: any) => {
  const params: any = useParams();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    url: "",
  });

  const handleSubmit = (values: any) => {
    fetch(
      `/api/contest/${params.contestId}/entry/${params.entryId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    ).then(() => history.push(`/profile`));
  };

  useEffect(() => {
    fetch(
      `/api/contest/${params.contestId}/entry/${params.entryId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setInitialValues(res);
      });
  }, []);

  return (
    <ContestEntry
      title="Edit your submission"
      initialValues={initialValues}
      handleSubmit={handleSubmit}
    />
  );
};
