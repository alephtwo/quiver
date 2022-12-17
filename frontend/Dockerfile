# Build the app
FROM node:alpine as builder
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Depoy the app on nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
