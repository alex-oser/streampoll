// https://github.com/express-validator/express-validator/blob/7f15d2d963574f34e0e312a96228b7b0693df1cf/src/chain/validators.ts#L4
const CREATE_CONTEST_SCHEMA = {
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
      errorMessage: "Description must be 5-2000 chars",
      options: { min: 5, max: 2000 },
    },
    exists: {
      errorMessage: "description is required",
    },
  },
  allowImageLinks: {
    exists: {
      errorMessage: "allowImageLinks is required",
    },
  },
  enterAnybody: {
    exists: {
      errorMessage: "enterAnybody is required",
    },
  },
  enterFollowers: {
    exists: {
      errorMessage: "enterFollowers is required",
    },
  },
  enterSubcribers: {
    exists: {
      errorMessage: "enterSubcribers is required",
    },
  },
  enterSubscribers: {
    exists: {
      errorMessage: "enterSubscribers is required",
    },
  },
  entryEnd: {
    exists: {
      errorMessage: "entryEnd is required",
    },
  },
  entryStart: {
    exists: {
      errorMessage: "entryStart is required",
    },
  },
  excludeDescription: {
    exists: {
      errorMessage: "excludeDescription is required",
    },
  },
  host: {
    exists: {
      errorMessage: "host is required",
    },
  },
  voteAnybody: {
    exists: {
      errorMessage: "voteAnybody is required",
    },
  },
  voteEnd: {
    exists: {
      errorMessage: "voteEnd is required",
    },
  },
  voteFollowers: {
    exists: {
      errorMessage: "voteFollowers is required",
    },
  },
  voteStart: {
    exists: {
      errorMessage: "voteStart is required",
    },
  },
  voteSubscribers: {
    exists: {
      errorMessage: "voteSubscribers is required",
    },
  },
  voteType: {
    exists: {
      errorMessage: "voteType is required",
    },
    isIn: {
      options: ["upvote", "upvote-downvote"],
      errorMessage: "Should be one of upvote|upvote-downvote",
    },
  },
  multipleUploads: {
    exists: {
      errorMessage: "multipleUploads is required",
    },
  },
};

module.exports = CREATE_CONTEST_SCHEMA;
