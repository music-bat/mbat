import { deleteFile } from './delete-file';
import { writeLibraryToDb } from '../afterSave/Neo4jSyncJob/write-library-to-db';
import { requestToken } from './request-token';
import { refreshToken } from './refresh-token';
import { fetchGroupPlaylist } from './query-group-playlist';
import { importPlaylist } from './import-playlist';

Parse.Cloud.define('fetchGroupPlaylist', fetchGroupPlaylist);
Parse.Cloud.define('refreshToken', refreshToken);
Parse.Cloud.define('requestToken', requestToken);
Parse.Cloud.define('deleteFile', deleteFile);
Parse.Cloud.define('processSyncJob', writeLibraryToDb);
Parse.Cloud.define('importPlaylist', importPlaylist);
