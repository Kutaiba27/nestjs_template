# --------- Build stage ---------
FROM node:22.13.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

RUN yarn build


# --------- Development stage ---------
FROM node:22.13.0-alpine AS development

WORKDIR /app

ENV NODE_ENV=development

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["yarn", "start:dev"]

# --------- Staging stage ---------

FROM node:22.13.0-alpine AS staging

WORKDIR /app

ENV NODE_ENV=staging

RUN corepack enable

COPY package.json yarn.lock  ./

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist
COPY templates ./templates

EXPOSE 5000

CMD ["yarn", "start:stag"]

# --------- Production stage ---------
FROM node:22.13.0-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist
COPY templates ./templates

EXPOSE 5000

CMD ["yarn", "start:prod"]
