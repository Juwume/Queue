FROM node:18.8.0-alpine3.16
COPY package.json package.json
RUN npm install
COPY . .
RUN node --max-old-space-size=4096 index.js
CMD ["npm", "run", "dev"]