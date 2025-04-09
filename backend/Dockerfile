# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app source
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
