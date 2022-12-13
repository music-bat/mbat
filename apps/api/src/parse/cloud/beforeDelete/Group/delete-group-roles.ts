console.debug('[Parse Cloud] Parse.Cloud.beforeDelete/Group/deleteGroupRoles mounted');

export async function deleteGroupRoles(request: Parse.Cloud.AfterDeleteRequest) {
  console.debug('deleteGroupRoles for group', request.object.id);

  const roles = await new Parse.Query('_Role').equalTo('groupId', request.object.id)
    .find({ useMasterKey: true });

  for (const role of roles) {
    await role.destroy({ useMasterKey: true });
  }
}
