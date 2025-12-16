module.exports = {
  'apps/client/**/*.{js,jsx,ts,tsx,vue}': (filenames) => {
    const files = filenames.map((f) => f.replace(/^apps\/client\//, '')).join(' ');
    return [`cd apps/client && eslint --fix ${files}`, `prettier --write ${filenames.join(' ')}`];
  },
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write --parser json'],
  'package.json': ['prettier --write'],
  '*.md': ['prettier --write'],
};
