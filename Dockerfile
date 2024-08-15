FROM node:20.15.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=5000
ENV DATABASE_URL=mongodb+srv://ycg:1kUpy1TSUT2hPuhW@cluster0.y1fn0.mongodb.net/
ENV JWT_SECRET=*zAZ;#tMRyy923-aOT

CMD ["node","index.js"]
