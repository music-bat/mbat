FROM node:16-alpine as release

ADD /dist /home/node/dist/
ADD package*.json /home/node/
ADD node_modules/ /home/node/node_modules/

WORKDIR /home/node/

EXPOSE 4000

CMD [ "node", "dist/pwa/server/main.js" ]
