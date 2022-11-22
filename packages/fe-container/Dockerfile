FROM nginx:1.21.6-alpine as build

LABEL name="microlc-element-composer" \
      eu.mia-platform.url="https://www.mia-platform.eu" \
      eu.mia-platform.version="1.0.0"

COPY nginx /etc/nginx

RUN touch ./off \
  && chmod o+rw ./off \
  && echo "microlc-element-composer: $COMMIT_SHA" >> /etc/nginx/commit.sha

WORKDIR /usr/static

COPY ./build .

USER nginx
