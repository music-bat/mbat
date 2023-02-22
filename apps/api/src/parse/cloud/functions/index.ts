// Parse.Cloud.define(
//   'functionName',
//   async function (req: Parse.Cloud.FunctionRequest<{ /* function props */ }>) {
//   },
// );
import { writeFile } from 'fs/promises';
import { deleteFile } from './delete-file';
import { writeLibraryToDb } from '../afterSave/Neo4jSyncJob/write-library-to-db';
import { requestToken } from './request-token';
import { refreshToken } from './refresh-token';
import { fetchGroupPlaylist } from './query-group-playlist';

Parse.Cloud.define('fetchGroupPlaylist', fetchGroupPlaylist);
Parse.Cloud.define('refreshToken', refreshToken);
Parse.Cloud.define('requestToken', requestToken);
Parse.Cloud.define('deleteFile', deleteFile);
Parse.Cloud.define('processSyncJob', writeLibraryToDb);
// eslint-disable-next-line @typescript-eslint/no-empty-function
Parse.Cloud.define('importPlaylist', async function (req) {
  let accessToken = req.params.accessToken;
  const offset = 0;
  const limit = 50;
  let stop = false;
  const items = [];
  let lastUpdate = undefined;
  const lastLibraryImport = req.user.get('lastLibraryImport');
  let url = `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`;

  let retriesAfterTokenExpired = 0;
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
        stop = true;
      }
      url = response?.data?.next;
    } catch (err) {
      if (err.status == 401) {
        console.warn('Spotify Request failed')
        retriesAfterTokenExpired += 1;
        if (retriesAfterTokenExpired < 3) {
          console.warn('Access Token expired, refresh token')
          const tokenResponse = await Parse.Cloud.run('refreshToken', { userId: req.user.id }, {useMasterKey: true});
          accessToken = tokenResponse.access_token;
          return makeRequest();
        }
      }
    }

    return response?.data;
  };

  for (let i = 0; i < 99999; i++) {
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
    }
    if (stop) {
      i = 9999999;

      const u = req.user;
      u.set('lastLibraryImport', new Date(lastUpdate));
      await u.save(undefined, { useMasterKey: true });
      // await writeFile('/user-library.json', JSON.stringify(items));

      const Neo4jSyncJob = Parse.Object.extend('Neo4jSyncJob');
      const syncJob: Parse.Object = new Neo4jSyncJob();
      syncJob.set('items', items);
      syncJob.set('user', req.user.toPointer());
      await syncJob.save(undefined, { useMasterKey: true });
      return items;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  }
});
