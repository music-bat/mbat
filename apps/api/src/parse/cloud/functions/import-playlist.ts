console.debug('[Parse Cloud] Parse.Cloud function "importPlaylist" mounted');

export async function importPlaylist(req: Parse.Cloud.FunctionRequest) {
  const offset = 0;
  const limit = 50;
  const items = [];
  const lastLibraryImport = req.user.get('lastLibraryImport');
  
  let url = `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`;

  let retriesAfterTokenExpired = 0;
  let stop = false;
  let lastUpdate = undefined;
  let accessToken = req.user.get('authData')?.access_token;

  const makeRequest = async () => {
    let response;
    try {
      response = await Parse.Cloud.httpRequest({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response?.data?.next) {
        // last page in pagination
        stop = true;
      } else {
        url = response?.data?.next;
      }
    } catch (err) {
      if (err.status == 401) {
        console.warn('Spotify Request failed');
        retriesAfterTokenExpired += 1;
        if (retriesAfterTokenExpired < 3) {
          console.warn('Access Token expired, refresh token');
          const tokenResponse = await Parse.Cloud.run('refreshToken', { userId: req.user.id }, { useMasterKey: true });
          accessToken = tokenResponse.access_token;
          return makeRequest();
        }
      }
    }

    return response?.data;
  };

  for (let i = 1; i < Number.MAX_VALUE; i++) {
    console.log('fetch page', i);
    const data = await makeRequest();
    if (!lastUpdate) {
      lastUpdate = new Date(data.items[0].added_at);
    }
    if (data.items) {
      for (const item of data.items) {
        if (new Date(item.added_at) < lastLibraryImport) {
          stop = true;
        } else {
          items.push(item);
        }
      }
      stop = true;
    }

    if (stop) {
      const u = req.user;
      await u.save({ lastLibraryImport: new Date(lastUpdate) }, { useMasterKey: true });

      const Neo4jSyncJob = Parse.Object.extend('Neo4jSyncJob');
      const syncJob: Parse.Object = new Neo4jSyncJob();
      await syncJob.save(
        {
          items,
          user: req.user.toPointer(),
        },
        { useMasterKey: true }
      );

      return items;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  }

}
