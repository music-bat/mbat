import { Cloud } from 'parse';

// Parse.Cloud.afterSave(
//   ClassList.Group,
//   async (request: AfterSaveRequest) => {
//
//   },
// );

export interface AfterSaveRequest
  extends Cloud.AfterSaveRequest<Parse.Object<unknown>> {
  context: {
    isNew: boolean;
  };
}
