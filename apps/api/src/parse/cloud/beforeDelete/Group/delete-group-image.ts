console.debug('[Parse Cloud] Parse.Cloud.beforeDelete/Group/deleteGroupImage mounted');

export async function deleteGroupImage(request: Parse.Cloud.AfterDeleteRequest) {
  console.debug('deleteGroupImage for group', request.object.id)
  const image: Parse.File = request.object.get('image');

  const fileObject = await new Parse.Query('FileObject').equalTo('fileName', image.name()).first({useMasterKey: true})

  // the actual file will be deleted after deletion of the file object
  await fileObject.destroy({ useMasterKey: true });
}
