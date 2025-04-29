const cp = require('child_process');
const fse = require('fs-extra');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEPLOY_ASSETS_DIR = path.join(ROOT_DIR, '.deploy');
const ORIGINAL_PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');

/**
 * @type import('../package.json')
 */
const ORIGINAL_PACKAGE_JSON = require(ORIGINAL_PACKAGE_JSON_PATH);

const { devDependencies: _, ...PACKAGE_JSON } = ORIGINAL_PACKAGE_JSON;

delete PACKAGE_JSON.scripts.prepare;

fse
  .rm(DEPLOY_ASSETS_DIR, {
    recursive: true,
    force: true,
  })
  .then(() => fse.ensureDir(DEPLOY_ASSETS_DIR))
  .then(async () => {
    cp.execSync('npm run tsc', { cwd: ROOT_DIR });

    await Promise.all([
      fse.writeJSON(path.join(DEPLOY_ASSETS_DIR, 'package.json'), PACKAGE_JSON),
      fse.copy(
        path.join(ROOT_DIR, 'app'),
        path.join(DEPLOY_ASSETS_DIR, 'app'),
        {
          filter(src) {
            if (src.endsWith('.ts')) return false;

            return true;
          },
        },
      ),
      fse.copy(
        path.join(ROOT_DIR, 'config'),
        path.join(DEPLOY_ASSETS_DIR, 'config'),
        {
          filter(src) {
            if (src.endsWith('.ts')) return false;

            return true;
          },
        },
      ),
    ]);

    cp.execSync('npm run clean', { cwd: ROOT_DIR });
  });
