FROM node:14-slim

ARG REACT_APP_SURVEY_URL='https://form.jotformeu.com/92007220751345?id={id}'
ARG REACT_APP_FIREBASE_JSON='{}'
ARG REACT_APP_RANKING_API='http://localhost'
ARG REACT_APP_SHOW_SURVEY=false
ARG PUBLIC_APP='http://localhost'
ARG TESTABLE_PORT=3000

WORKDIR /var/www/app

COPY package*.json ./

COPY . .

RUN npm install && \
    mkdir public/docs && \
    npm run build

EXPOSE 3000

CMD ./node_modules/.bin/serve -p $TESTABLE_PORT -s build