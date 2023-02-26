FROM node:16-alpine as release

COPY /dist/apps/api /home/node/dist/
COPY /dist/apps/cloud /home/node/dist/cloud
COPY package*.json /home/node/
COPY node_modules/ /home/node/node_modules/

WORKDIR /home/node/

EXPOSE 1337

CMD [ "node", "dist/main.js" ]
