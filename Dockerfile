FROM node:14-alpine
ENV PATH /app/node_modules/react-scripts/bin:$PATH

WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install 
RUN chown -R node /app
COPY .  ./ 
CMD ["yarn", "start"]
