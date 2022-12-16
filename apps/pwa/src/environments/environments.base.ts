/*
* Dear Developer,
* the variables here should all be configurable via environment variables.
* Please add new variables here: apps/pwa/build/load-env.js
* */
export const environmentsBase = {
  parse: {
    appId: '{{{PARSE_APP_ID}}}',
    serverUrl: '{{{PARSE_SERVER_URL}}}',
    javascriptKey: '{{{PARSE_JAVASCRIPT_API_KEY}}}',
    liveQueryUrl: '{{{PARSE_LIVE_QUERY_URL}}}',
  },
  spotify: {
    clientId: '{{{SPOTIFY_CLIENT_ID}}}',
    redirectUri: '{{{SPOTIFY_REDIRECT_URI}}}',
  },
};
