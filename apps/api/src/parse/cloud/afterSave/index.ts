import { Cloud } from 'parse';
import './File/index';
import { ClassList, customParseClasses } from '../class-list';
import { setupGroupPermissions } from './Group/setup-group-permissions';
import { addEveryoneRole } from './User/add-everyone-role';

customParseClasses.forEach((className) => {
  Parse.Cloud.afterSave(className, (request: AfterSaveRequest) => {
    switch (className) {
      case ClassList.Group:
        setupGroupPermissions(request).catch((err) => console.error('[Parse Cloud] afterSave/Group/setupGroupPermissions', err));
        break;
      case ClassList._User:
        console.log('addEveryoneRole')
        addEveryoneRole(request).catch((err) => console.error('[Parse Cloud] afterSave/_User/addEveryoneRole', err));
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
