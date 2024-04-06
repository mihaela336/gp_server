#node version orig 17 changed to 20 which is on my system
FROM node:20

#Working Dir (linux dir where app will be stored?)
WORKDIR /usr/src/app

#copy package.json
COPY package*.json ./

#install prettier (for our package build function)
#RUN npm install prettier -g

#install files
RUN npm install

#copy source files
COPY . .

#build
#RUN npm run build

#expose API port
EXPOSE 3000

CMD ["node", "index.js"]