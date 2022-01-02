# Getting Started
Here you'll learn how to get the whole development environment up and running to either explore the app or start contributing.

## Install required binaries
Install the following tools:
Node.js >=16.0.0 is required to run the backend and frontend code. 
Docker >= 19.03.0 is required to host local databases, admin dashboards and a local mail server.

## Clone and Install
First, clone the repository `git clone https://github.com/music-bat/mbat.git` and install all dependencies `npm install`.

## Generate a docker-compose.yml
Run `npm run generate:docker-compose` to generate a docker-compose.yml. This file is final and should not be touched.
Besides that, a .env file has been created. You can configure everything in there.

## Configure Environment Variables
Visit [Environment Variables](docs/ENVIRONMENT_VARIABLES.md) to learn which environment variables you can define.
There are required environment variables you need to define before you can continue with the next step.

## Start everything
Run `docker-compose up` to start all docker containers. This will take a while the first time. If it does not work, you may have reached the docker pull rate limit. To fix that, simply login into a docker account or buy a docker license to increase the limit if you're already logged in.

Verify that all containers are up and running. `docker ps | grep mbat | wc -l` should return 5.
After that, you can build the project via `npm run build` and start via `npm run start`. This will serve the backend (parse-server) and the frontend (pwa) and starts a watch process to transpile parse cloud code which will be executed via parse server.
Every change you make to the source code under apps/ will trigger a hot reload, you should immediately see your changes.
