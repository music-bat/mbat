export enum ClassList {
  _Role = '_Role',
  _Session = '_Session',
  _User = '_User',
  FileObject = 'FileObject',
  Group = 'Group',
  GroupProfile = 'GroupProfile',
  GroupInvite = 'GroupInvite',
  UserProfile = 'UserProfile',
}

export const customParseClasses = Object.values(ClassList).filter(
  (className) => !className.startsWith('_'),
);
