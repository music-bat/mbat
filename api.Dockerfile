FROM node:16-alpine as release

ADD /dist/apps/api /home/node/dist/
ADD package*.json /home/node/
ADD node_modules/ /home/node/node_modules/

WORKDIR /home/node/

EXPOSE 1337

CMD [ "node", "dist/main.js" ]
