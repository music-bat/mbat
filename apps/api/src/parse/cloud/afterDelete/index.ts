import { ClassList, customParseClasses } from '../class-list';
import { deleteRelatedFile } from './FileObject/delete-related-file';

customParseClasses.forEach((className) => {
  Parse.Cloud.afterDelete(className, (request: Parse.Cloud.AfterDeleteRequest) => {
    switch (className) {
      case ClassList.FileObject:
        deleteRelatedFile(request).catch((err) => console.error('[Parse Cloud] afterDelete/FileObject/deleteRelatedFile', err));
        break;
      case ClassList.Group:
        break
    }
  });
});
