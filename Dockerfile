# Node.js app
FROM node:21-alpine AS node-app

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
EXPOSE 2370
CMD ["node", "src/index.js"]


# Nginx
FROM nginx:alpine

# Remove default Nginx config
# RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

COPY public/ /app/public

EXPOSE 70

CMD [ "nginx", "-g", "daemon off;"]
