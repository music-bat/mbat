# Environment Variables
Here are defined which environment variables the project uses.

## Parse Server
These environment variables take effect in the parse server (api).

| Environment Variable                   | Is Required | Notes                                                                           |
|----------------------------------------|-------------|---------------------------------------------------------------------------------|
| DATABASE_URI                           | **yes**     | mongodb database uri                                                            |
| REDIS_URL                              | **yes**     | redis database uri                                                              |
| APP_ID                                 | **yes**     | parse app id                                                                    |
| MASTER_KEY                             | **yes**     | secret required to perform backend logic as master user                         |
| FILE_KEY                               | **yes**     | Api key required to access files from api                                       |
| SERVER_URL                             | **yes**     | Internal backend api url for services inside the cloud network                  |
| PUBLIC_SERVER_URL                      | **yes**     | Public backend api url for the frontend                                         |
| PARSE_SERVER_LOGS_FOLDER               | no          | Path where parse server logs should be stored                                   |
| VERIFY_USER_EMAILS                     | no          | Flag. set to true when emails need to be verified before accounts are activated |
| EMAIL_VERIFY_VALIDITY_DURATION_SECONDS | no          | Duration in seconds, a user has to verify a new account                         |
| SMTP_FROM                              | **yes**     | SMTP sender name                                                                |
| SMTP_AUTH_USER                         | **yes**     | SMTP account for the backend used to send mails                                 |
| SMTP_AUTH_PASSWORD                     | **yes**     | SMTP account password                                                           |
| SMTP_AUTH_HOST                         | **yes**     | SMTP server host                                                                |
| SMTP_AUTH_SSL                          | **yes**     | Flag. Set to true if SMTP server should use a SSL configuration                 |
| SMTP_AUTH_PORT                         | **yes**     | SMTP Server Port                                                                |
| CLOUD_CODE_PATH                        | no          | Path to the parse cloud code build entrypoint                                   |
| VERIFY_USER_EMAILS                     | no          | Flag. Set to true to send mails for email verification                          |
