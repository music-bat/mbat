import { ClassList, customParseClasses } from '../class-list';
import { Cloud } from 'parse';

customParseClasses.forEach((className) => {
  Parse.Cloud.beforeSave(className, (request: BeforeSaveRequest) => {
    request.context.isNew = request.object.isNew();

    switch (className) {
      case ClassList.Group:
        break;
      case ClassList.GroupProfile:
        break;
      case ClassList.UserProfile:
        break;
    }
  });
});

export interface BeforeSaveRequest
  extends Cloud.BeforeSaveRequest<Parse.Object<unknown>> {
  context: {
    isNew: boolean;
  };
}
