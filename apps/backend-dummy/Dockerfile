FROM node:18-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

RUN npm install -g turbo@^2
COPY . .

RUN npx turbo prune --scope=backend-dummy --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install --legacy-peer-deps

# Build the project
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/packages ./packages
RUN npx turbo run build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner
USER runner

COPY --from=installer /app/apps/backend-dummy/dist ./dist
COPY --from=installer /app/apps/backend-dummy/package.json ./package.json
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/packages ./packages

CMD [ "node", "./dist/index.js" ]
