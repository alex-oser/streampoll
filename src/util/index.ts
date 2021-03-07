import { nanoid } from "nanoid";

const { REACT_APP_CLIENT_ID } = process.env;
const { protocol, host } = window.location;
const OAUTH_CALLBACK_URL = `${protocol}//${host}/api/oauth/callback`;

const state = nanoid(22);
const paramsMap: any = {
  client_id: REACT_APP_CLIENT_ID,
  redirect_uri: OAUTH_CALLBACK_URL,
  response_type: "code",
  state: state,
  scope: "user:read:email",
};

const params: any = Object.keys(paramsMap)
  .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(paramsMap[k]))
  .join("&");

export const LOGIN_URL = `https://id.twitch.tv/oauth2/authorize?${params}`;
