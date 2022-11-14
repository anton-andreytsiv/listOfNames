FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN npm install 
EXPOSE 3000
RUN chown -R node /app
USER node
RUN npx prisma generate
RUN npx prisma migrate
RUN npx ts-node prisma/seed.ts
CMD ["npm", "run", "start:dev"]
