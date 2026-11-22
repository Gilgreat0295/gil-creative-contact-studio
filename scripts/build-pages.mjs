import { spawnSync } from 'node:child_process';
import {
  existsSync,
  readFileSync,
  renameSync,
  rmdirSync,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';

const vinextCli = resolve('node_modules/vinext/dist/cli.js');
const prerenderModule = resolve('node_modules/vinext/dist/build/prerender.js');
const originalPrerenderSource = readFileSync(prerenderModule, 'utf8');
const requestPattern = 'new Request(`http://localhost${urlPath}`';
const patchedRequest =
  'new Request(`http://localhost${config.basePath}${urlPath}${config.trailingSlash && urlPath !== "/" ? "/" : ""}`';

// vinext 1.0.0-beta.5 omits basePath from its internal static-export requests.
// Patch the installed build module for this command only, then restore it.
const patchedPrerenderSource = originalPrerenderSource.includes(requestPattern)
  ? originalPrerenderSource.replaceAll(requestPattern, patchedRequest)
  : originalPrerenderSource;

let result;
try {
  if (patchedPrerenderSource !== originalPrerenderSource) {
    writeFileSync(prerenderModule, patchedPrerenderSource);
  }
  result = spawnSync(process.execPath, [vinextCli, 'build'], {
    env: { ...process.env, GITHUB_PAGES: 'true' },
    stdio: 'inherit',
  });
} finally {
  if (patchedPrerenderSource !== originalPrerenderSource) {
    writeFileSync(prerenderModule, originalPrerenderSource);
  }
}

if (result.status === 0) {
  const clientDir = resolve('dist/client');
  const nestedAssetRoot = resolve(clientDir, 'gil-creative-contact-studio');
  const nestedNextDir = resolve(nestedAssetRoot, '_next');
  const pagesNextDir = resolve(clientDir, '_next');

  // GitHub Pages mounts the artifact root at /<repository>/, so the generated
  // _next directory must stay at the artifact root while URLs retain basePath.
  if (existsSync(nestedNextDir) && !existsSync(pagesNextDir)) {
    renameSync(nestedNextDir, pagesNextDir);
    rmdirSync(nestedAssetRoot);
  }
}

process.exit(result.status ?? 1);
