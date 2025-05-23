# --------- Build stage ---------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn install

COPY . .

RUN yarn build


# --------- Development stage ---------
FROM node:22-alpine AS development

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn add -D dotenv-cli

COPY . .

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["yarn", "start:dev"]

# --------- Staging stage ---------

FROM node:22-alpine AS staging

WORKDIR /app

ENV NODE_ENV=staging

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install 

RUN yarn add -D dotenv-cli

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["yarn", "start:stag"]

# --------- Production stage ---------
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --production

RUN yarn add -D dotenv-cli

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["yarn", "start:prod"]
