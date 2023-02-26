console.debug('[Parse Cloud] Parse.Cloud function "refreshToken" mounted');

export async function requestToken(req: Parse.Cloud.FunctionRequest & { params: { user: Parse.User; code: string } }) {
  const { code } = req.params;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  const response = await Parse.Cloud.httpRequest({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    body: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64'),
    },
  });

  return response.data;
}
