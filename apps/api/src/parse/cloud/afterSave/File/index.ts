console.debug('[Parse Cloud] Parse.Cloud.afterSaveFile mounted');

Parse.Cloud.afterSaveFile(async (request) => {
  const { file, user } = request;
  const fileObject = new Parse.Object('FileObject');
  fileObject.set('fileName', file.name());
  fileObject.set('file', file);
  fileObject.set('createdBy', user);
  await fileObject.save(null, { useMasterKey: true });
});
