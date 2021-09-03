FROM node:14-alpine
ENV PATH /app/node_modules/react-scripts/bin:$PATH

WORKDIR /site/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install 
COPY .  ./ 
CMD ["yarn", "start"]
