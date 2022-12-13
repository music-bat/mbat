console.debug('[Parse Cloud] Parse.Cloud function "deleteFile" mounted');

export async function deleteFile(request: Parse.Cloud.FunctionRequest<{ __type: 'File'; name: string; url: string }>) {
  const { params, user } = request;

  if (!params.name) {
    throw 'You have to provide a file name.';
  }

  const query = new Parse.Query('FileObject');
  query.equalTo('fileName', params.name);

  const fileObject = await query.first({ useMasterKey: true });

  if (fileObject && fileObject.get('createdBy').id !== user.id) {
    throw 'You do not have permission to delete this file';
  }

  const file: Parse.File = fileObject.get('file');
  await file.destroy({ useMasterKey: true });

  return fileObject.destroy({ useMasterKey: true });
}
