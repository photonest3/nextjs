/** @type {import('next').NextConfig} */
const nextConfig = {

  "redirects": [
    {
      "source": "/",
      "destination": "/index.html",
      "statusCode": 301
    }
  ]
};

export default nextConfig;

