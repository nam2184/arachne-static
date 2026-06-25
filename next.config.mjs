const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isProjectPage = repoName && !repoName.endsWith(".github.io");

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && isProjectPage ? `/${repoName}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
