# Use Node.js as the base image
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy root package.json
COPY package.json ./

# Copy ONLY the backend folder
COPY backend/ ./backend/

# Install backend dependencies
RUN npm run install-backend

# Expose the port (Hugging Face uses 7860 by default)
EXPOSE 7860

# Set environment variables
ENV NODE_ENV=production
ENV PORT=7860

# Start the API
CMD ["npm", "start"]
