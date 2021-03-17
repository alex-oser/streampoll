import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getContestById } from "../../service/contests";

import { CreateContest } from "./CreateContest";

export const EditContest = (props: any) => {
  const params: any = useParams();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    // console.log(params, editMode);
    const fetchContests = async () => {
      const contest: any = await getContestById(params.id);
      setInitialValues(contest);
    };

    fetchContests();
  }, []);

  return (
    <CreateContest
      editMode={true}
      initialValues={initialValues}
    />
  );
};
