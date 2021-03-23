import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { getContestById } from "../../service/contests";
import { ContestEntry } from "./ContestEntry";

export const NewContestEntry = (props: any) => {
  const params: any = useParams();
  const history = useHistory();
  const [contestData, setContestData] = useState<any>();

  const handleSubmit = (values: any) => {
    fetch(`/api/contest/${params.id}/enter`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contestId: params.id,
        title: values.title,
        description: values.description,
        url: values.url,
      }),
    })
      .then((res) => res.json())
      .then((res) => history.push(`/contest/${params.id}/entry/${res.id}`));
  };

  const initialValues = {
    title: "",
    description: "",
    url: "",
  };

  useEffect(() => {
    getContestById(params.id)
    .then(res => setContestData(res))
  }, []);

  return (
    <ContestEntry
      title="Enter the contest!!!"
      initialValues={initialValues}
      contestData={contestData}
      handleSubmit={handleSubmit}
    />
  );
};
