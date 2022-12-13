const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [...getJestProjects(), '<rootDir>/apps/api', '<rootDir>/apps/pwa'],
};
