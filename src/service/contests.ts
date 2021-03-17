export const getContestById = (id: string) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/contest/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          return reject(res.error);
        }

        resolve(res);
      });
  });
};

export const createContest = (data: any) => {
  return new Promise((resolve, reject) => {
    fetch("/api/contest/create", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res.id);
      })
      .catch((err) => reject(err));
  });
};

export const updateContest = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/contest/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
