import { ClassList, customParseClasses } from '../class-list';
import './File/index'
import { deleteGroupImage } from "./Group/delete-group-image";
import { deleteGroupRoles } from "./Group/delete-group-roles";

console.debug('beforeDelete execute')
customParseClasses.forEach((className) => {
  Parse.Cloud.beforeDelete(className, (request: Parse.Cloud.BeforeDeleteRequest) => {

    switch (className) {
      case ClassList.Group:
        console.debug('##################### beforeDelete registered for Group')
        deleteGroupImage(request).catch((err) => console.error('[Parse Cloud] beforeDelete/FileObject/deleteGroupImage', err));
        deleteGroupRoles(request).catch((err) => console.error('[Parse Cloud] beforeDelete/FileObject/deleteGroupRoles', err));
        break;
      case ClassList.UserProfile:
        break;
    }
  });
});
