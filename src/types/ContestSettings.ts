interface ContestSettings {
  title?: string;
  description?: string;
  contestType?: string;
  entryStart?: Date;
  entryEnd?: Date;
  entryVisibility?: Array<string>; // ["followers", "subscribers"]
  voteStart?: Date;
  voteEnd?: Date;
  voteVisiblity?: Array<string>;
  voteFormat?: string;
  contestHost?: string;
  hostProfileImageUrl?: string;
  excludeDescription?: boolean;
  entryCount?: number;
  allowImageLinks?: boolean;
  allowMultipleEntries?: boolean;
  useMods?: boolean;
  notifications?: {
    email?: boolean;
    twitch?: boolean;
  }

}

export type { ContestSettings };
