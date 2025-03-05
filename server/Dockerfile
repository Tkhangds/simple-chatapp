# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 (or any port your app uses)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]

