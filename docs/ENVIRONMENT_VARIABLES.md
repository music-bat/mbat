# Environment Variables
Here are defined which environment variables the project uses. Use `parse-server --help` to get a lost of all native Parse Server environment variables. 

## Angular App (pwa)
These environment variables take effect in the angular application when running in docker.
For local development, configure these variables in the environments file directly: `apps/pwa/src/environments/environment.dev.ts`.

### General
| Environment Variable       | Is Required | Notes                                                |
|----------------------------|-------------|------------------------------------------------------|
| PARSE_APP_ID               | **yes**     | Parse app id                                         |
| PARSE_SERVER_URL           | **yes**     | Url of the parse backend (api)                       |
| PARSE_JAVASCRIPT_API_KEY   | **yes**     | Javascript Key configured in the parse backend (api) |

### Spotify
| Environment Variable       | Is Required | Notes                                                                                                              |
|----------------------------|-------------|--------------------------------------------------------------------------------------------------------------------|
| SPOTIFY_CLIENT_ID          | **yes**     | A spotify client ID. Get your own client id [here](https://developer.spotify.com/dashboard/applications)           |
| SPOTIFY_REDIRECT_URI       | **yes**     | A redirect uri pointing to the path /account/login of your frontend, e.g. https://app.music-bat.com/account/login. |


## Parse Server (api)
These environment variables take effect in the parse server.
### General
| Environment Variable       | Is Required | Notes                                                                         |
|----------------------------|-------------|-------------------------------------------------------------------------------|
| APP_ID                     | **yes**     | Parse app id                                                                  |
| SERVER_URL                 | **yes**     | Internal backend api url for services inside the cloud network                |
| PUBLIC_SERVER_URL          | **yes**     | Public backend api url for the frontend                                       |
| PARSE_SERVER_LOGS_FOLDER   | no          | Path where parse server logs should be stored                                 |
| JSON_LOGS                  | no          | Set to 1 to create json like log files for services like google cloud logging |
| PARSE_SERVER_MAX_LIMIT     | no          | Limits the number of elements returned by queries.                            |
| PARSE_SERVER_MOUNT_PATH    | no          | Mount path for the server, defaults to /parse                                 |

### Traffic 
| Environment Variable             | Is Required | Notes                                                 |
|----------------------------------|-------------|-------------------------------------------------------|
| PARSE_SERVER_MAX_LIMIT           | no          | Limits the number of elements returned by queries.    |
| PARSE_SERVER_MAX_UPLOAD_SIZE     | no          | Limits the size of files which are uploaded to parse. |

### Access Control
| Environment Variable                          | Is Required | Notes                                                                                                                                           |
|-----------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| MASTER_KEY                                    | **yes**     | Secret required to perform backend logic as master user                                                                                         |
| PARSE_SERVER_READ_ONLY_MASTER_KEY             | no          | Read-only key, which has the same capabilities as MasterKey without writes                                                                      |
| FILE_KEY                                      | **yes**     | Api key required to access files from api                                                                                                       |
| JAVASCRIPT_KEY                                | **yes**     | Api key required to access api from javascript app (PWA)                                                                                        |
| PARSE_SERVER_REVOKE_SESSION_ON_PASSWORD_RESET | no          | Flag. When a user changes their password, either through the reset password email or while logged in, all sessions are revoked if this is true. |
| PARSE_SERVER_SESSION_LENGTH                   | no          | Flag.  Session duration, in seconds, defaults to 1 year.                                                                                        |
| PREVENT_LOGIN_WITHOUT_VERIFIED_EMAIL          | no          | Flag. Set to true to deny login for users without verified email.                                                                               |
| PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION      | no          | Flag. Set to false to disallow clients to create new classes on database.                                                                       |
| PARSE_SERVER_ALLOW_HEADERS                    | no          |                                                                                                                                                 |

### Databases
| Environment Variable                   | Is Required | Notes                                          |
|----------------------------------------|-------------|------------------------------------------------|
| DATABASE_URI                           | **yes**     | MongoDB database uri.                          |
| REDIS_URL                              | **yes**     | Redis database uri. Required for Live Queries. |


### Cloud Code
| Environment Variable                   | Is Required | Notes                                                                           |
|----------------------------------------|-------------|---------------------------------------------------------------------------------|
| CLOUD_CODE_PATH                        | no          | Path to the parse cloud code build entrypoint                                   |

### E-Mail
| Environment Variable                   | Is Required | Notes                                                                                                                             |
|----------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------|
| EMAIL_APP_NAME                         | no          | App Name to be used in email templates.                                                                                           |
| VERIFY_USER_EMAILS                     | no          | Flag. Set to true to send mails for email verification. Accounts won't be activated until the activation link from email is used. |
| EMAIL_VERIFY_VALIDITY_DURATION_SECONDS | no          | Duration in seconds, a user has to verify a new account                                                                           |
| SMTP_FROM                              | **yes**     | SMTP sender name                                                                                                                  |
| SMTP_AUTH_USER                         | **yes**     | SMTP account for the backend used to send mails                                                                                   |
| SMTP_AUTH_PASSWORD                     | **yes**     | SMTP account password                                                                                                             |
| SMTP_AUTH_HOST                         | **yes**     | SMTP server host                                                                                                                  |
| SMTP_AUTH_SSL                          | **yes**     | Flag. Set to true if SMTP server should use a SSL configuration                                                                   |
| SMTP_AUTH_PORT                         | **yes**     | SMTP Server Port                                                                                                                  |
