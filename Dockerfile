FROM node:8.16.0-alpine as builder

COPY . /app/
WORKDIR /app/

RUN npm install
RUN npm run build

FROM nginx:latest
# RUN SERVER ON STARTUP
COPY --from=builder /app/build/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]

# OPEN PORT
EXPOSE 80

# FROM node:8.16.0-alpine as builder

# COPY . /app/
# WORKDIR /app/

# RUN npm install

# EXPOSE 8100

# CMD ["npm", "start"]