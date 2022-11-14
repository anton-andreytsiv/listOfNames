FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN npm install 
EXPOSE 8080
RUN chown -R node /app
USER node

CMD ["npm", "run", "serve"]
