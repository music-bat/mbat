import { config } from 'dotenv';
import * as path from "path";

config();

const env = {
  databaseURI: process.env.DATABASE_URI,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  fileKey: process.env.FILE_KEY,
  javascriptKey: process.env.JAVASCRIPT_KEY,
  serverURL: process.env.SERVER_URL,
  publicServerURL: process.env.PUBLIC_SERVER_URL,
  verifyUserEmails:
    String(process.env.VERIFY_USER_EMAILS).toLowerCase() == 'true',
  emailVerifyTokenValidityDuration:
    Number(process.env.EMAIL_VERIFY_VALIDITY_DURATION_SECONDS) || 2 * 60 * 60, // in seconds
  preventLoginWithUnverifiedEmail:String(process.env.PREVENT_LOGIN_WITHOUT_VERIFIED_EMAIL).toLowerCase() == 'true',
  emailConf: {
    service: 'SMTP',
    extension: 'handlebars',
    fromAddress: process.env.SMTP_FROM,
    user: process.env.SMTP_AUTH_USER,
    password: process.env.SMTP_AUTH_PASSWORD,
    host: process.env.SMTP_AUTH_HOST,
    isSSL: String(process.env.SMTP_AUTH_SSL).toLowerCase() === 'true',
    port: process.env.SMTP_AUTH_PORT,
    name: process.env.SMTP_DOMAIN_NAME,
    appName: process.env.EMAIL_APP_NAME
  },
};

export const parseSeverConf = {
  databaseURI: env.databaseURI, // Connection string for your MongoDB database
  cloud: process.env.CLOUD_CODE_PATH || './dist/apps/api/parse/cloud/index.js',
  appId: env.appId,
  masterKey: env.masterKey,
  fileKey: env.fileKey,
  javascriptKey: env.javascriptKey,
  serverURL: env.serverURL,
  // Enable email verification
  verifyUserEmails: env.verifyUserEmails,

  // if `verifyUserEmails` is `true` and
  //     if `emailVerifyTokenValidityDuration` is `undefined` then
  //        email verify token never expires
  //     else
  //        email verify token expires after `emailVerifyTokenValidityDuration`
  //
  // `emailVerifyTokenValidityDuration` defaults to `undefined`
  //
  // email verify token below expires in 2 hours (= 2 * 60 * 60 == 7200 seconds)
  emailVerifyTokenValidityDuration: env.emailVerifyTokenValidityDuration, // in seconds

  // set preventLoginWithUnverifiedEmail to false to allow user to login without verifying their email
  // set preventLoginWithUnverifiedEmail to true to prevent user from login if their email is not verified
  preventLoginWithUnverifiedEmail: env.preventLoginWithUnverifiedEmail || false, // defaults to false

  // The public URL of your app.
  // This will appear in the link that is used to verify email addresses and reset passwords.
  // Set the mount path as it is in serverURL
  publicServerURL: env.publicServerURL,
  // Your apps name. This will appear in the subject and body of the emails that are sent.
  appName: env.emailConf.appName || 'mBat',
  // The email adapter
  emailAdapter: !env.emailConf
    ? undefined
    : {
        module: 'simple-parse-smtp-adapter',
        options: {
          ...env.emailConf,

          //Sometimes the user email is not in the 'email' field, the email is search first in
          //email field, then in username field, if you have the user email in another field
          //You can specify here
          // emailField: 'username',
          templates: {
            //This template is used only for reset password email
            resetPassword: {
              //Path to your template
              template: path.join(__dirname , '/parse/views/email/reset-password'),
              //Subject for this email
              subject: 'Reset your password',
            },
            verifyEmail: {
              template: path.join(__dirname , '/parse/views/email/verify-email'),
              subject: 'Verify Email',
            },
          },
        },

        // account lockout policy setting (OPTIONAL) - defaults to undefined
        // if the account lockout policy is set and there are more than `threshold` number of failed login attempts then the `login` api call returns error code `Parse.Error.OBJECT_NOT_FOUND` with error message `Your account is locked due to multiple failed login attempts. Please try again after <duration> minute(s)`. After `duration` minutes of no login attempts, the application will allow the user to try login again.
        accountLockout: {
          duration: 5, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
          threshold: 3, // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
          unlockOnPasswordReset: true, // Is true if the account lock should be removed after a successful password reset. Default: false.
        },
      },
  // optional settings to enforce password policies
  passwordPolicy: {
    // Two optional settings to enforce strong passwords. Either one or both can be specified.
    // If both are specified, both checks must pass to accept the password
    // 1. a RegExp object or a regex string representing the pattern to enforce
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
    // 2. a callback function to be invoked to validate the password
    // validatorCallback: (password) => {
    //   return validatePassword(password);
    // },
    validationError:
      'Password must contain at least 8 digits, at least one capital letter and one special character.', // optional error message to be sent instead of the default "Password does not meet the Password Policy requirements." message.
    doNotAllowUsername: true, // optional setting to disallow username in passwords
    maxPasswordAge: 90, // optional setting in days for password expiry. Login fails if user does not reset the password within this period after signup/last reset.
    maxPasswordHistory: 5, // optional setting to prevent reuse of previous n passwords. Maximum value that can be specified is 20. Not specifying it or specifying 0 will not enforce history.
    //optional setting to set a validity duration for password reset links (in seconds)
    resetTokenValidityDuration: 24 * 60 * 60, // expire after 2 hours
  },
  liveQuery: {
    classNames: ['Group', 'GroupProfile', 'UserProfile'], // List of classes to support for query subscriptions
    redisURL: process.env.REDIS_URL,
  },
};

// Serve the Parse API on the /parse URL prefix
