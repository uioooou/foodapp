/**
 * @type {import('next').NextConfig}
 */
// const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig = {
  // basePath: isGithubPages ? "/foodapp" : "localhost",
  // assetPrefix: isGithubPages ? "/foodapp/" : "localhost",
  distDir: "dist",
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

module.exports = nextConfig;
