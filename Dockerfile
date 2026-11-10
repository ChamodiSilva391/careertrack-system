FROM node:20-alpine

WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy application files
COPY . .

# Expose Vite dev server port
EXPOSE 5180

# Run Vite dev server bound to 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
