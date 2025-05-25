# Step 1: Build Angular app
FROM node:16.17.0 AS build

WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files and build the Angular app in production mode
COPY . .
RUN npm run build -- --configuration production

# Step 2: Serve the Angular app using http-server
FROM node:16.17.0-alpine

# Install a lightweight static file server globally
RUN npm install -g http-server

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/frontend_angular /app

WORKDIR /app

# Expose port 8080
EXPOSE 8080

# Start the server to serve Angular app on port 8080
CMD ["http-server", "-p", "8080"]
