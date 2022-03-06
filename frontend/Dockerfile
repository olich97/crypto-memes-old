# stage 1: install dependencies
FROM node:lts as dependencies
WORKDIR /crypto-memes-ui
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# stage 2: build the Next.js app
FROM node:lts as builder
WORKDIR /crypto-memes-ui
COPY . .
COPY --from=dependencies /crypto-memes-ui/node_modules ./node_modules
RUN npm run build

# stage 3: configure the runtime environment of the Next.js app
FROM node:lts as runner
WORKDIR /crypto-memes-ui
ENV NODE_ENV production

COPY --from=builder /crypto-memes-ui/next.config.js ./
COPY --from=builder /crypto-memes-ui/public ./public
COPY --from=builder /crypto-memes-ui/.next ./.next
COPY --from=builder /crypto-memes-ui/node_modules ./node_modules
COPY --from=builder /crypto-memes-ui/package.json ./package.json

# run the app
CMD ["npm", "run", "start"]