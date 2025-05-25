# Step 1: Use Node.js to build the Angular app
FROM node:16.17.0 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Step 2: Serve with http-server
FROM node:16.17.0-alpine

# Install a lightweight static server
RUN npm install -g http-server

# Copy built Angular app from build step
COPY --from=build /app/dist/your-app-name /app

WORKDIR /app

EXPOSE 8080


# Step 8: Serve the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0"]
