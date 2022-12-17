const glob = require('glob');
const fs = require('fs/promises');
const fork = require('child_process').fork;

/**
 * Dear Maintainer,
 * configure all environment variables here,
 * which should be loaded into the app.
 * */
const envs = require('./environment-variables');

(async () => {
  // Load environment variables
  const files = glob.sync('/home/node/dist/pwa/browser/main.*.js');
  await loadEnvironmentVariables(files[0], true);
  await loadEnvironmentVariables('/home/node/dist/pwa/server/main.js');

  // Start the frontend server after environment variables have been loaded
  fork('/home/node/dist/pwa/server/main.js');
})();

/**
 * This function loads environment variables into (javascript) files.
 *
 * @example
 * Define a variable with an environment-variable-name in triple braces as value, e.g. `const variable='{{{SOME_ENV}}}';.
 * The value {{{SOME_ENV}}} will be replaced by this function by the actual value of `process.env.SOME_ENV`.
 *
 * @param {string} path - Path to the (javascript) file.
 * @param {boolean} logMissingValues - Whether missing env values should be logged or not.
 * @returns {void}
 */
async function loadEnvironmentVariables(path, logMissingValues = false) {
  let sourceCode = await fs.readFile(path, 'utf8');

  for (const env of envs) {
    if (process.env[env]) {
      console.log(`Loaded variable "${env}" into file ${path}.\n`);
      sourceCode = sourceCode.replace(`{{{${env}}}}`, process.env[env]);
    } else if (logMissingValues) {
      console.warn(`No value defined vor variable "${env}".\n`);
    }
  }

  return fs.writeFile(path, sourceCode, 'utf8');
}
