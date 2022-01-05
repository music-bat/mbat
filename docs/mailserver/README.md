# Introduction
We use the [Docker Mailserver](https://docker-mailserver.github.io/docker-mailserver/edge/) to host a local smtp server for development.
In this file is documented how to get started with the mailserver.

## CLI
A cli to interact with the mailserver can be found under [mail-cli.sh](/mail-cli.sh).
The documentation for the whole cli can be found [here](https://docker-mailserver.github.io/docker-mailserver/edge/config/setup.sh/).

## E-Mail Accounts
All email accounts can be found in [.mailserver/config/postfix-accounts.cf](/.mailserver/config/postfix-accounts.cf)

### Development Mail Account
For development, a mail account has been set up:
name:     `development@music-bat.com`
password: `development`

### List all email Accounts
Use the following script to list all existing email accounts:
`./mail-cli.sh email list`

### Add email Account
Use the following script to add more email accounts:
`./mail-cli.sh email add <EMAIL ADDRESS> [<PASSWORD>]`
If no password is provided, the cli prompts to enter one.

### Delete email Account
Use the following script to delete an email accounts:
`./mail-cli.sh email del <EMAIL ADDRESS>`

### Update email Account Password
Use the following script to update the password for an email account:
`./mail-cli.sh email update <EMAIL ADDRESS> [<NEW PASSWORD>]`
If no password is provided, the cli prompts to enter one.

## Sending E-Mails

### Within Parse
For sending emails we use a parse smtp adapter. Emails use handlebars templates which, in our case, are just html files with parameters. 
You can use three parameters in these templates: The `appName`, the parse `user` object and a `link`.

### Outside Parse
For sending emails outside parse, you can use [nodemailer](https://www.npmjs.com/package/nodemailer) in combination with [email-templates](https://github.com/forwardemail/email-templates).
