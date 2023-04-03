console.debug('[Parse Cloud] Parse.Cloud function "refreshToken" mounted');

export async function refreshToken(req: Parse.Cloud.FunctionRequest & { params: { user?: Parse.User; code: string; userId?: string } }) {
  const { user: requestUser, userId } = req.params;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  let user: Parse.User;

  if (requestUser) {
    user = requestUser;
  } else {
    user = await new Parse.Query('_User').get(userId, { useMasterKey: true }) as Parse.User;
  }

  if(!user){
    throw 'User not found.';
  }

  const authData = user.get('authData');

  const response = await Parse.Cloud.httpRequest({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    body: {
      grant_type: 'refresh_token',
      refresh_token: authData.spotify.refresh_token,
    },
    headers: {
      Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64'),
    },
  });

  await user.save(
    {
      authData,
      ...response.data,
    },
    { useMasterKey: true }
  );

  return response.data;
}
