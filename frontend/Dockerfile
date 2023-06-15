FROM  --platform=linux/amd64  node:18-alpine

WORKDIR /app/frontend
# Copy package.json and yarn.lock
COPY package.json  /app/frontend/

# Install dependencies
RUN npm install 

# Copy app files

COPY . /app/frontend/

EXPOSE 3000

# Command to start the app
CMD ["npm", "run","dev"]

