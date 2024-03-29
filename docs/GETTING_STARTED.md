# Getting Started
Here you'll learn how to get the whole development environment up and running to either explore the app or start contributing.

## Install required binaries
Install the following tools:
Node.js >=16.0.0 <= 17.0.0 is required to run the backend and frontend code. 
Docker >= 19.03.0 is required to host local databases, admin dashboards and a local mail server.

## Step 1: Clone and Install
First, clone the repository `git clone https://github.com/music-bat/mbat.git` and install all dependencies `npm install`.

## Step 2:  Generate a docker-compose.yml
Run `npm run generate:docker-compose` to generate a docker-compose.yml. This file is final and should not be touched.
Besides that, a .env file has been created. You can configure everything in there.

## Step 3.1:  Configure Environment Variables
Visit [Environment Variables](docs/ENVIRONMENT_VARIABLES.md) to learn which environment variables you can define.
There are required environment variables you need to define before you can continue with the next step.

### Angular Environments for local development
Copy [the default environment file](apps/pwa/src/environments/environment.ts) to `apps/pwa/src/environments/environment.dev.ts` and configure your local environment variables here.

## Setup Spotify
In order to login locally, it's required to create a spotify app for development.
Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and create an app.
Configure `http://localhost:4200/account/login` as redirect URI, also add this to `apps/pwa/src/environments/environment.dev.ts`.
After you've configured this, it should be possible to log in to the local pwa with your spotify account.

### Step 3.2: Email Client
We use an SMTP client within our api server which requires to have the following environment variables set:
```dotenv
SMTP_FROM="no-reply@music-bat.de"
SMTP_AUTH_USER="development@music-bat.com"
SMTP_AUTH_PASSWORD="development"
SMTP_AUTH_HOST="localhost"
SMTP_AUTH_PORT=25
SMTP_AUTH_SSL="false"
SMTP_DOMAIN_NAME="music-bat.com"
```
Please copy these into the `/.env` file which has been generated during [step 3.1](step-3.2:-email-client). You can leave the values as is since these are the default settings we use within our development environment.

## Step 4:  Start everything
Run `docker-compose up` to start all docker containers. This will take a while the first time. If it does not work, you may have reached the docker pull rate limit. To fix that, simply login into a docker account or buy a docker license to increase the limit if you're already logged in.

Verify that all containers are up and running. `docker ps | grep mbat | wc -l` should return 5.
After that, you can build the project via `npm run build` and start via `npm run start`. This will serve the backend (parse-server) and the frontend (pwa) and starts a watch process to transpile parse cloud code which will be executed via parse server.
Every change you make to the source code under apps/ will trigger a hot reload, you should immediately see your changes.


## Any issues during the setup? 
If you have any questions, we're happy to help - get in touch with us via our Discord server. An up to date invitation to our Discord Server can be found in the footer/bottom of our [website](https://music-bat.com).
