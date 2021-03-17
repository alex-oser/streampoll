const UPDATE_CONTEST_SCHEMA = {
  title: {
    in: ["body"],
    isLength: {
      errorMessage: "Title must be at least 3 chars",
      options: { min: 3, max: 60 },
    },
    exists: {
      errorMessage: "Title is required",
    },
  },
  description: {
    in: ["body"],
    isLength: {
      errorMessage: "Description must be at least 2000 chars",
      options: { min: 5, max: 2000 },
    },
    exists: {
      errorMessage: "Title is required",
    },
  },
  allowImageLinks: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  enterAnybody: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  enterFollowers: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  enterSubcribers: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  enterSubscribers: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  entryEnd: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  entryStart: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  excludeDescription: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  host: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  voteAnybody: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  voteEnd: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  voteFollowers: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  voteStart: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  voteSubscribers: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  voteType: {
    exists: {
      errorMessage: "Title is required",
    },
  },
  multipleUploads: {
    exists: {
      errorMessage: "Title is required",
    },
  },
};

module.exports = UPDATE_CONTEST_SCHEMA;
