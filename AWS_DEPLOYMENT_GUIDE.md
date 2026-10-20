# AWS EC2 + Custom Domain Deployment Guide

This guide walks you through registering a custom domain on any digital registrar (Namecheap, GoDaddy, Hostinger, etc.) and hosting your full-stack AI Health Copilot application on an AWS EC2 instance with Docker and automated HTTPS (SSL).

---

## 📋 Architecture Overview

- **AWS EC2 Virtual Server**: Hosts the Docker container stack.
- **Nginx Reverse Proxy Gateway (Port 80/443)**: Routes browser traffic:
  - `/*` $\rightarrow$ Next.js Frontend (`port 3000`)
  - `/api/*` & `/docs` $\rightarrow$ FastAPI Backend (`port 8000`)
- **Let's Encrypt Certbot**: Provides free, automated SSL/TLS certificates for `https://yourdomain.com`.
- **Domain Registrar**: Connects your purchased domain to your AWS EC2 Elastic IP via DNS `A` records.

---

## Step 1: Register Your Custom Domain

1. Go to any domain registrar of your choice (e.g. [Namecheap](https://www.namecheap.com), [GoDaddy](https://www.godaddy.com), [Hostinger](https://www.hostinger.com)).
2. Search for your desired domain name (e.g., `healthcopilot.in` or `myhealthcopilot.com`) and complete the purchase.
3. Keep the **DNS Management** or **Advanced DNS** page open in your registrar dashboard.

---

## Step 2: Launch an AWS EC2 Instance

1. Log in to the [AWS Management Console](https://aws.amazon.com/console/).
2. Navigate to **EC2** $\rightarrow$ Click **Launch Instance**.
3. Configure your instance:
   - **Name**: `health-copilot-prod`
   - **OS Image (AMI)**: **Ubuntu Server 24.04 LTS** (or 22.04 LTS), 64-bit (x86)
   - **Instance Type**:
     - `t3.small` (2 vCPU, 2 GiB RAM - **Recommended** for smooth Docker builds)
     - or `t3.micro` / `t2.micro` (Free Tier eligible)
   - **Key Pair**: Select an existing key pair or click **Create new key pair** (e.g., `copilot-key.pem`) and download it.
4. **Network Settings (Security Group)**:
   Ensure the following inbound ports are open:
   | Type | Port | Source | Purpose |
   | :--- | :--- | :--- | :--- |
   | **SSH** | `22` | `0.0.0.0/0` (or your IP) | Remote terminal access |
   | **HTTP** | `80` | `0.0.0.0/0` | Web traffic & SSL challenges |
   | **HTTPS** | `443` | `0.0.0.0/0` | Secure SSL encrypted web traffic |
5. **Storage**: Set disk size to at least **20 GB** (gp3).
6. Click **Launch Instance**.

---

## Step 3: Attach an Elastic IP (Permanent Public IP)

> [!IMPORTANT]
> Standard AWS EC2 public IPs change whenever the instance stops or restarts. An **Elastic IP** provides a static, permanent IP that never changes.

1. In the EC2 console left sidebar, go to **Network & Security** $\rightarrow$ **Elastic IPs**.
2. Click **Allocate Elastic IP address** $\rightarrow$ **Allocate**.
3. Select the newly created Elastic IP $\rightarrow$ click **Actions** $\rightarrow$ **Associate Elastic IP address**.
4. Choose your running EC2 instance (`health-copilot-prod`) and click **Associate**.
5. Copy your Elastic IP address (e.g. `54.210.120.45`).

---

## Step 4: Point Your Domain to AWS via DNS

Go to your domain registrar's DNS Management dashboard and create two **A Records**:

| Type | Host / Name | Value / Points to | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` (or leave blank) | `YOUR_ELASTIC_IP` (e.g. `54.210.120.45`) | Auto / 300s |
| **A Record** | `www` | `YOUR_ELASTIC_IP` (e.g. `54.210.120.45`) | Auto / 300s |

*DNS changes typically propagate within 5 to 15 minutes.*

---

## Step 5: Connect to Your EC2 Server & Deploy

1. Open your terminal on your computer and connect to EC2 using your SSH key:
   ```bash
   chmod 400 copilot-key.pem
   ssh -i copilot-key.pem ubuntu@YOUR_ELASTIC_IP
   ```

2. Clone your repository:
   ```bash
   git clone https://github.com/Amith-Gupta/punishment.git
   cd punishment
   ```

3. (Optional) Configure production environment keys:
   ```bash
   cp backend/.env.example backend/.env
   nano backend/.env
   # Add your GEMINI_API_KEY if desired (mock fallback works automatically if omitted)
   ```

4. Run the automated deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

   *The script installs Docker, compiles the Next.js static assets, builds the FastAPI backend, and starts the Nginx reverse proxy gateway.*

---

## Step 6: Enable Free HTTPS / SSL with Certbot

Once your domain points to your Elastic IP:

1. Install Certbot on the EC2 server:
   ```bash
   sudo apt-get install -y certbot
   ```

2. Request an SSL certificate:
   ```bash
   sudo certbot certonly --webroot -w ./certbot/www -d yourdomain.com -d www.yourdomain.com
   ```
   *(Replace `yourdomain.com` with your actual purchased domain).*

3. Update [`nginx/nginx.conf`](file:///c:/Users/pachi/.antigravity-ide/punishment/nginx/nginx.conf) to uncomment SSL configuration:
   ```bash
   sudo nano nginx/nginx.conf
   ```
   Add the SSL server block:
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com www.yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

       location /api/ {
           proxy_pass http://backend_upstream;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-Proto https;
       }

       location / {
           proxy_pass http://frontend_upstream;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-Proto https;
       }
   }
   ```

4. Reload Nginx:
   ```bash
   sudo docker compose restart nginx
   ```

Your app is now live with production HTTPS at **`https://yourdomain.com`**!
