import { deleteFile } from './delete-file';
import { writeLibraryToDb } from '../afterSave/Neo4jSyncJob/write-library-to-db';
import { requestToken } from './request-token';
import { refreshToken } from './refresh-token';
import { fetchGroupPlaylist } from './query-group-playlist';
import { importPlaylist } from './import-playlist';
import { createGroupInvite } from './group-invite-code/create-invite-code';
import { deleteGroupInvite } from './group-invite-code/delete-invite-code';
import { joinGroupByInviteCode } from './group-invite-code/join-group-by-invite-code';

Parse.Cloud.define('fetchGroupPlaylist', fetchGroupPlaylist);
Parse.Cloud.define('refreshToken', refreshToken);
Parse.Cloud.define('requestToken', requestToken);
Parse.Cloud.define('deleteFile', deleteFile);
Parse.Cloud.define('processSyncJob', writeLibraryToDb);
Parse.Cloud.define('importPlaylist', importPlaylist);
Parse.Cloud.define('createGroupInvite', createGroupInvite);
Parse.Cloud.define('deleteGroupInvite', deleteGroupInvite);
Parse.Cloud.define('joinGroupByInviteCode', joinGroupByInviteCode);
