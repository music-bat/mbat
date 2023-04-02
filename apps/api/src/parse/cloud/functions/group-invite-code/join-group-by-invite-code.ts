console.debug('[Parse Cloud] Parse.Cloud function "joinGroupByInviteCode" mounted');

/**
 * Joins a group by invite code
 * @param request Parse Request
 * @param request.params.inviteCode The invite code
 * @param request.user The user
 * @returns The group
 */
export async function joinGroupByInviteCode(request: Parse.Cloud.FunctionRequest<{ inviteCode: string }>) {

  const user = request.user;

  if (!user) {
    throw 'You have to be logged in to use an invite code.';
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

  const groupRelation = user.relation('groups');
  groupRelation.add(groupObject);

  await user.save(null, { useMasterKey: true });

  return groupObject;
}
