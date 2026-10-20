# Stage 1: Build Next.js static export
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files and build static export
COPY . .
RUN npm run build

# Stage 2: Serve static export with lightweight Nginx
FROM nginx:alpine

# Copy custom nginx configuration for frontend
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 3000;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri.html $uri/ /index.html;
    }

    # Cache static assets
    location /_next/static {
        root /usr/share/nginx/html;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

# Copy static assets from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
