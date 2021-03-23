export const getMyVotes = (contestId: string) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/contest/${contestId}/votes/me`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
