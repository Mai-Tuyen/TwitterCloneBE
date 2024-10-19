FROM node:20-alpine3.16

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY ecosystem.config.js .
COPY .env.production .
COPY ./src ./src
# COPY ./openapi ./openapi

# RUN apk update && apk add bash
# RUN apk add --no-cache ffmpeg
RUN apk add python3
RUN npm install pm2 -g
RUN npm install
RUN npm run build

EXPOSE 4400

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
