FROM node
WORKDIR /app
COPY /dist /app
COPY package.json package.json
RUN yarn
