FROM node:16-alpine as release

COPY /dist /home/node/dist/
COPY package*.json /home/node/
COPY node_modules/ /home/node/node_modules/

WORKDIR /home/node/

EXPOSE 4000

CMD [ "node", "dist/pwa/server/main.js" ]
