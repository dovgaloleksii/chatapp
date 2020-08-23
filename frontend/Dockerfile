FROM node:14.8.0-alpine

WORKDIR .
ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . ./
