# Deployment Guide for Education LMS

This guide outlines the steps to deploy the Education LMS (frontend) to a production environment.

## Prerequisites

- **Node.js**: Ensure you have Node.js (version 16 or later) installed.
- **npm**: npm is usually installed with Node.js.
- **Git**: For version control.

## Installation

Before deploying, ensure all dependencies are installed:

```bash
npm install
```

## Development

To run the application locally in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This command will bundle the application into the `dist` directory. The output is a static site (HTML, CSS, JS) that can be served by any static file server.

## Previewing the Build

Before deploying, you can preview the production build locally:

```bash
npm run preview
```

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest way to deploy Vite/React applications.

1.  Create a Vercel account at [vercel.com](https://vercel.com).
2.  Install Vercel CLI: `npm i -g vercel`
3.  Login: `vercel login`
4.  Run deployment inside the project folder:
    ```bash
    vercel
    ```
5.  Follow the prompts. Vercel will automatically detect the Vite settings.

### 2. Netlify

1.  Create a Netlify account at [netlify.com](https://netlify.com).
2.  Drag and drop the `dist` folder (created after `npm run build`) onto the Netlify dashboard.
3.  Alternatively, connect your Git repository for continuous deployment.
    -   **Build command:** `npm run build`
    -   **Publish directory:** `dist`

### 3. Static Web Server (Nginx/Apache)

You can serve the contents of the `dist` folder using any web server.

-   Copy the contents of `dist` to your web server's root directory (e.g., `/var/www/html` for Nginx).
-   Ensure your server is configured to handle client-side routing (SPA). For Nginx, add this to your location block:
    ```nginx
    location / {
      try_files $uri $uri/ /index.html;
    }
    ```

### 4. Docker

You can containerize the application using Docker.

**Dockerfile Example:**

```dockerfile
# Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run the Docker image:

```bash
docker build -t education-lms-frontend .
docker run -p 80:80 education-lms-frontend
```

## Environment Variables

Currently, the application uses mock data. When you integrate a real backend, you will likely need environment variables for API endpoints.

Creating a `.env` file:
```env
VITE_API_URL=https://api.your-backend.com
```

Access in code: `import.meta.env.VITE_API_URL`
