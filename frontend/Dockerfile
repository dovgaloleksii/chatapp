FROM node:14.8.0-alpine

WORKDIR .
ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./

RUN yarn --silent
RUN yarn global add --silent react-scripts serve

COPY . ./

RUN yarn build
