FROM node:10-alpine AS BUILDER 

RUN mkdir /builder
WORKDIR /builder

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build-storybook

FROM node:10-alpine AS SERVER

RUN mkdir /storybook
WORKDIR /storybook

COPY --from=BUILDER /builder/storybook-static .
COPY --from=BUILDER /builder/public ../public

RUN npm install -g serve

EXPOSE 5000

CMD ["serve"]