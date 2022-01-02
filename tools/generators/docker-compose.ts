/**
 * Dear Maintainer,
 * this file provides a tool to generate a ready-to-use and up-to-date docker-compose.yml for this project.
 * Use this generator to generate your personal docker-compose.yml where you can make changes and play around.
 * The docker-compose.yml you generate is git-ignored and will contain credentials!
 * IMPORTANT: This script will also override credentials in your local .env file. Keep this in mind!
 * */
import { dump } from 'js-yaml';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { generate as generatePW } from 'generate-password';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// generate our docker-compose.yml
generate({
  version:
    '3.9' /* compatible with docker engine version 19.03.0+, see https://docs.docker.com/compose/compose-file/*/,
  services: {
    /*
     * parse_db is our main database where we store user and group information.
     * apps using this container: api (parse-server)
     * */
    parse_db: {
      image: 'mongo:latest',
      container_name: 'mbat-parse-mongo',
      restart: 'unless-stopped',
      environment: {
        MONGO_INITDB_ROOT_USERNAME: 'root',
        MONGO_INITDB_ROOT_PASSWORD: (() => {
          const databasePassword = generatePassword('DATABASE_PASSWORD');
          defineEnvironmentVariable('DATABASE_URI',`mongodb://root:${databasePassword}@localhost:27017/dev`)
          return databasePassword;
        })(),
      },
      ports: ['27017:27017'],
      volumes: ['mongodb_data:/data/mongo-db'],
    },

    parse_dashboard: {
      image: 'parseplatform/parse-dashboard:latest',
      container_name: 'mbat-parse-dashboard',
      ports: ['4040:4040'],
      environment: {
        PARSE_DASHBOARD_SERVER_URL: process.env.SERVER_URL,
        PARSE_DASHBOARD_MASTER_KEY: process.env.MASTER_KEY,
        PARSE_DASHBOARD_APP_ID: process.env.APP_ID,
        PARSE_DASHBOARD_APP_NAME: 'mBat',
      },
    },

    /*
     * neo4j is our graph database where we store user libraries
     * apps using this container: api (parse-server)
     * */
    neo4j: {
      image: 'neo4j:4.3-community',
      container_name: 'mbat-neo4j',
      restart: 'unless-stopped',
      ports: ['7474:7474' /* Web Interface */, '7687:7687' /* DB Connection */],
      volumes: [
        './.neo4j/conf:/conf',
        './.neo4j/data:/data' /* git ignored */,
        './.neo4j/import:/import',
        './.neo4j/logs:/logs' /* git ignored */,
        './.neo4j/plugins:/plugins',
      ],
      environment: {
        /* Find neo4j docker configuration details here: https://neo4j.com/docs/operations-manual/current/docker/configuration/ */
        NEO4J_AUTH: `neo4j/${generatePassword()}`,
        NEO4J_dbms_memory_pagecache_size: '1G',
        'NEO4J_dbms.memory.heap.initial_size': '1G',
        NEO4J_dbms_memory_heap_max__size: '1G',
      },
    },

    /*
     * redis is used for parse server's internal cache
     * apps using this container: api (parse-server)
     * */
    redis: {
      image: 'redis:6.2-alpine',
      container_name: 'mbat-parse-redis',
      restart: 'unless-stopped',
      command: `redis-server --requirepass ${generatePassword()}`,
      ports: ['6379:6379'],
      volumes: [
        'redis_data:/var/lib/redis',
        'redis_conf:/usr/local/etc/redis/redis.conf',
      ],
      environment: ['REDIS_REPLICATION_MODE=master'],
    },

    /*
     * mailserver is used for parse server's mail features
     * apps using this container: api (parse-server)
     * */
    mailserver: {
      image: 'docker.io/mailserver/docker-mailserver:latest',
      hostname: 'smtp.mbat.io',
      domainname: 'mail.mbat.io',
      container_name: 'mbat-mailserver',
      env_file: './.mailserver/mailserver.env',
      ports: ['25:25', '143:143', '465:465', '587:587', '993:993'],
      volumes: [
        './.mailserver/data:/var/mail',
        './.mailserver/state:/var/mail-state',
        './.mailserver/logs:/var/log/mail',
        './.mailserver/config:/tmp/docker-mailserver/',
      ],
      restart: 'always',
      stop_grace_period: '1m',
      cap_add: ['NET_ADMIN', 'SYS_PTRACE'],
    },
  },
  volumes: {
    mongodb_data: null,
    redis_data: null,
    redis_conf: null,
  },
});

/*
 * Generate yaml from a json object and writes it into docker-compose.yml into the project root directory.
 * */
function generate(obj: any): void {
  const yamlString = dump(obj, {
    styles: {
      '!!null': 'lowercase',
      '!!int': 'lowercase',
      '!!bool': 'lowercase',
    },
    sortKeys: false,
  });

  writeFileSync(
    path.join(__dirname, '../../', 'docker-compose.yml'),
    yamlString
  );
}

/*
 * Generate a random password with length of 24 characters.
 * optional: write the password to an environment variable to .env file
 * */
function generatePassword(environmentName?: string): string {
  const password: string = generatePW({
    length: 24,
    numbers: true,
  });

  if (!environmentName) return password;

  defineEnvironmentVariable(environmentName, password);

  return password;
}

function defineEnvironmentVariable(name: string, value: string){
  const dotenvData = config().parsed || {};
  dotenvData[name] = value;

  let envFileString = '';
  Object.keys(dotenvData).forEach(
    (key) => (envFileString += `${key}="${dotenvData[key]}"\n`)
  );

  writeFileSync(path.join(__dirname, '../../', '.env'), envFileString);
}
