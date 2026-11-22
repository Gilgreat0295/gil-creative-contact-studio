import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryBasePath = '/gil-creative-contact-studio';
const basePath = isGitHubPages ? repositoryBasePath : '';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGitHubPages,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: isGitHubPages
      ? 'https://gilgreat0295.github.io/gil-creative-contact-studio'
      : 'https://gil-creative-co-portfolio.noisymimosa.chatgpt.site',
  },
};

export default nextConfig;
