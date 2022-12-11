console.debug('[Parse Cloud] Parse.Cloud.beforeSaveFile mounted');

Parse.Cloud.beforeSaveFile(async (request) => {
  const { file, user } = request;
  file.addMetadata('createdBy', user?.id)
  return file;
});
