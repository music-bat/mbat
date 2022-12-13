import { AfterSaveRequest } from '../index';

console.debug('[Parse Cloud] Parse.Cloud.afterSave/_User/assignEveryoneRole mounted');
export async function assignEveryoneRole(request: AfterSaveRequest) {
  const { object: user } = request as AfterSaveRequest & { object: Parse.User };

  if (request.context.isNew) {
    console.debug('addEveryoneRole to user')
    const everyoneRole: Parse.Role = (await new Parse.Query('_Role')
      .equalTo('name', 'everyone')
      .first({ useMasterKey: true })) as Parse.Role;
    everyoneRole.getUsers().add(user as Parse.User);

    return everyoneRole.save(undefined, { useMasterKey: true });
  }
}
