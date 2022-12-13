console.debug('[Parse Cloud] Parse.Cloud.afterDelete/FileObject/deleteRelatedFile mounted');

export async function deleteRelatedFile(request: Parse.Cloud.AfterDeleteRequest) {
  const file: Parse.File = request.object.get('file');
  return file
    .destroy({ useMasterKey: true })
    .then(() => console.debug('deleted file', file.name()))
    .catch((err) => {
      if (err.code !== 153) {
        throw err;
      }
    });
}
