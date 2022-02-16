# stage 1: install dependencies
FROM node:lts as dependencies
WORKDIR /coding-break-ui
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# stage 2: build the Next.js app
FROM node:lts as builder
WORKDIR /coding-break-ui
COPY . .
COPY --from=dependencies /coding-break-ui/node_modules ./node_modules
RUN npm run build

# stage 3: configure the runtime environment of the Next.js app
FROM node:lts as runner
WORKDIR /coding-break-ui
ENV NODE_ENV production

COPY --from=builder /coding-break-ui/next.config.js ./
COPY --from=builder /coding-break-ui/public ./public
COPY --from=builder /coding-break-ui/.next ./.next
COPY --from=builder /coding-break-ui/node_modules ./node_modules
COPY --from=builder /coding-break-ui/package.json ./package.json

# run the app
CMD ["npm", "run", "start"]