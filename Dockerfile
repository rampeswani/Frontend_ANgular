# Step 1: Use official Node.js v16.17.0 as the base image
FROM node:16.17.0

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Install Angular CLI v14.2.13 globally
RUN npm install -g @angular/cli@14.2.13

# Step 6: Copy all source files to the container
COPY . .

# Step 7: Expose Angular's default port
EXPOSE 4200

# Step 8: Serve the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0"]
