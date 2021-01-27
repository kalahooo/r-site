FROM node:12-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app
# Installing dependencies
COPY package*.json ./
RUN npm install
# Copying source files
COPY . .
# Building app
RUN npm run build
# Running the app
EXPOSE 3000
CMD [ "npm", "start" ]