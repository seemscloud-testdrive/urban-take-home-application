FROM node:16.17.0-alpine
LABEL Mainteiner="mateusz.adam.katana@gmail.com"

ARG APP_DIR="/home/node"

WORKDIR "${APP_DIR}"

USER "${APP_USER}"

RUN mkdir -p src

COPY ./src/package.json src
COPY ./src/package-lock.json src

RUN cd src && \
    yarn add prom-client && \
    yarn install

COPY ./src src

RUN cd src && \
    npm run build

COPY ./docker-entrypoint.sh .

ENTRYPOINT [ "/bin/sh", "docker-entrypoint.sh" ]