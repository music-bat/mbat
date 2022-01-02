export enum ClassList {
  _Role = '_Role',
  _Session = '_Session',
  _User = '_User',
  Group = 'Group',
  GroupProfile = 'Group',
  UserProfile = 'PokerCard',
}

export const customParseClasses = Object.values(ClassList).filter(
  (className) => !className.startsWith('_'),
);
