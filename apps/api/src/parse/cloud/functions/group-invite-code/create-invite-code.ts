console.debug('[Parse Cloud] Parse.Cloud function "createGroupInvite" mounted');

/**
 * Creates a new invite code for a group. The group Id is the invite code.
 * There can only be one invite code. Invite codes expire after 3 months.
 * @param request Parse Request
 * @param request.params.groupId The group id
 */
export async function createGroupInvite(request: Parse.Cloud.FunctionRequest<{ groupId: string }>) {

  const { groupId } = request.params;

  if (!groupId) {
    throw 'You have to provide a group id.';
  }

  const groupQuery = new Parse.Query('Group');
  groupQuery.equalTo('objectId', groupId);

  const groupObject = await groupQuery.first({ useMasterKey: true });

  if (!groupObject) {
    throw 'Group not found.';
  }

  const inviteCodeQuery = new Parse.Query('GroupInviteCode');
  inviteCodeQuery.equalTo('group', groupObject);

  const inviteCodeObject = await inviteCodeQuery.first({ useMasterKey: true });

  if (inviteCodeObject) {
    throw 'Invite code already exists.';
  }

  const newInviteCode = new Parse.Object('GroupInviteCode');
  newInviteCode.set('group', groupObject.toPointer());
  newInviteCode.set('createdBy', request.user.toPointer());

  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 3);
  newInviteCode.set('expiresAt', expiresAt);

  await newInviteCode.save(null, { useMasterKey: true });
  await newInviteCode.save({code: newInviteCode.id}, { useMasterKey: true });

  return newInviteCode;
}