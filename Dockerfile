# Use Node.js as the base image
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy root package.json
COPY package.json ./

# Copy backend and frontend folders
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Install all dependencies and build the frontend
RUN npm run build

# Expose the port (Hugging Face uses 7860 by default)
EXPOSE 7860

# Set environment variables
ENV NODE_ENV=production
ENV PORT=7860

# Start the application
CMD ["npm", "start"]
