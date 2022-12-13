import { AfterSaveRequest } from '../index';

console.debug('[Parse Cloud] Parse.Cloud.afterSave/_User/assignEveryoneRole mounted');
export async function assignEveryoneRole(request: AfterSaveRequest) {
  const { object: user } = request as AfterSaveRequest & { object: Parse.User };

  if (user.isNew()) {
    console.debug('addEveryoneRole to user')
    const everyoneRole: Parse.Role = (await new Parse.Query('_Role')
      .equalTo('name', 'everyone')
      .first({ useMasterKey: true })) as Parse.Role;
    everyoneRole.getUsers().add(user);

    return everyoneRole.save(undefined, { useMasterKey: true });
  }
}
