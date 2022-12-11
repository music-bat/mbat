import { AfterSaveRequest } from '../index';

console.debug('[Parse Cloud] Parse.Cloud.afterSave/Group/setupGroupPermissions mounted');

export async function setupGroupPermissions(request: AfterSaveRequest) {
  console.debug(request.context.isNew ? 'setupGroupPermissions' : 'setupGroupPermissions skipped');
  if (!request.context.isNew) return;

  const { user } = request;

  const groupACL = new Parse.ACL();
  groupACL.setPublicReadAccess(false);
  groupACL.setPublicWriteAccess(false);
  groupACL.setReadAccess(user, true);
  groupACL.setWriteAccess(user, true);

  const groupModeratorRole = new Parse.Role(`${request.object.id}-moderator`, groupACL);
  groupModeratorRole.relation('group').add(request.object);
  groupModeratorRole.set('type', 'moderator');
  groupModeratorRole.set('groupId', request.object.id);
  await groupModeratorRole.save(undefined, { useMasterKey: true });

  groupACL.setRoleReadAccess(groupModeratorRole, true);
  groupACL.setRoleWriteAccess(groupModeratorRole, true);

  const groupMemberRole = new Parse.Role(`${request.object.id}-member`, groupACL);
  groupMemberRole.relation('group').add(request.object);
  groupMemberRole.set('type', 'member');
  groupMemberRole.set('groupId', request.object.id);
  await groupMemberRole.save(undefined, { useMasterKey: true });

  groupACL.setRoleReadAccess(groupModeratorRole, true);
  groupACL.setRoleReadAccess(groupMemberRole, true);
  groupACL.setRoleWriteAccess(groupModeratorRole, true);

  request.object.setACL(groupACL);

  return request.object.save(undefined, { useMasterKey: true });
}
