FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN npm install 
EXPOSE 8000
RUN chown -R node /app
USER node
CMD ["npm", "run", "start:dev"]
