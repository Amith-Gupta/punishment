#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "AI Health Copilot - Automated AWS EC2 Deployment Setup"
echo "=========================================================="

# 1. Update OS packages
echo "[1/4] Updating system packages..."
sudo apt-get update -y && sudo apt-get upgrade -y

# 2. Install Docker and Docker Compose if not present
echo "[2/4] Verifying Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker "$USER"
    rm get-docker.sh
fi

if ! command -v docker compose &> /dev/null; then
    echo "Installing Docker Compose plugin..."
    sudo apt-get install -y docker-compose-plugin
fi

# 3. Create Certbot directories for SSL certificate storage
echo "[3/4] Preparing SSL directory structure..."
mkdir -p certbot/conf certbot/www

# 4. Build and start containers
echo "[4/4] Building and launching application containers..."
sudo docker compose down --remove-orphans || true
sudo docker compose build --no-cache
sudo docker compose up -d

echo ""
echo "=========================================================="
echo "DEPLOYMENT COMPLETE!"
echo "=========================================================="
echo "HTTP is active on: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 || echo 'YOUR_SERVER_IP')"
echo "FastAPI Docs:      http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 || echo 'YOUR_SERVER_IP')/docs"
echo ""
echo "Next step for HTTPS / Custom Domain:"
echo "Once your domain DNS A-record points to this server's IP, run:"
echo "  sudo certbot certonly --webroot -w ./certbot/www -d yourdomain.com -d www.yourdomain.com"
echo "=========================================================="
