import { Cloud } from 'parse';
import './File/index';
import { ClassList, customParseClasses } from '../class-list';
import { setupGroupPermissions } from './Group/setup-group-permissions';
import { assignEveryoneRole } from './User/assign-everyone-role';
import { writeLibraryToDb } from "./Neo4jSyncJob/write-library-to-db";
Parse.Cloud.afterSave('Neo4jSyncJob', writeLibraryToDb)
customParseClasses.forEach((className) => {
  Parse.Cloud.afterSave(className, (request: AfterSaveRequest) => {
    switch (className) {
      case ClassList.Group:
        setupGroupPermissions(request).catch((err) => console.error('[Parse Cloud] afterSave/Group/setupGroupPermissions', err));
        break;
      case ClassList._User:
        assignEveryoneRole(request).catch((err) => console.error('[Parse Cloud] afterSave/_User/assignEveryoneRole', err));
        break;
      case ClassList.UserProfile:
        break;
    }
  });
});

export interface AfterSaveRequest extends Cloud.AfterSaveRequest<Parse.Object<unknown>> {
  context: {
    isNew: boolean;
  };
}
