FROM node:lts-alpine
ENV NODE_ENV 'production'
ENV CURAM_API ''
ENV USER_SERVICE_API ''
ENV BENEFIT_SERVICE_API ''
COPY ./ ./
RUN npm install --only=prod
EXPOSE 3000
CMD ["npm", "start"]
