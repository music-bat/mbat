FROM node:16-alpine as release

COPY dist/ /home/node/dist/
COPY apps/pwa/build/ /home/node/
COPY package*.json /home/node/
COPY node_modules/ /home/node/node_modules/

WORKDIR /home/node/

EXPOSE 4000

ENTRYPOINT ["/bin/sh", "/home/node/entrypoint.sh"]
