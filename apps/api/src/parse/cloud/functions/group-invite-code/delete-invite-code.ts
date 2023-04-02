console.debug('[Parse Cloud] Parse.Cloud function "deleteGroupInvite" mounted');

/**
 * Deletes an invite code for a group
 */
export async function deleteGroupInvite(request: Parse.Cloud.FunctionRequest<{ inviteCode: string }>) {

  const user = request.user;

  if (!user) {
    throw 'You have to be logged in to delete an invite code.';
  }

  const { inviteCode } = request.params;

  if (!inviteCode) {
    throw 'You have to provide an invite code.';
  }

  const inviteCodeQuery = new Parse.Query('GroupInviteCode');
  inviteCodeQuery.equalTo('code', inviteCode);

  const inviteCodeObject = await inviteCodeQuery.first({ useMasterKey: true });

  if (!inviteCodeObject) {
    throw 'Invite code not found.';
  }

  const group = inviteCodeObject.get('group');

  const groupQuery = new Parse.Query('Group');
  groupQuery.equalTo('objectId', group.id);

  const groupObject = await groupQuery.first({ useMasterKey: true });

  if (!groupObject) {
    throw 'Group not found.';
  }

  if (groupObject.get('createdBy').id !== user.id) {
    throw 'You do not have permission to delete an invite code for this group.';
  }

  return inviteCodeObject.destroy({ useMasterKey: true });

}
