import { useParams, useHistory } from "react-router";
import { ContestEntry } from "./ContestEntry"

export const NewContestEntry = (props: any) => {
  const params: any = useParams();
  const history = useHistory();

  const handleSubmit = (values: any) => {
    fetch("/api/contest/enter", {
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
    }).then(() => history.push(`/contest/${params.id}`));
  };

  const initialValues = {
    title: "",
    description: "",
    url: "",
  }

  return (
    <ContestEntry title="Enter the contest!!!" initialValues={initialValues} handleSubmit={handleSubmit} />
  );
};
