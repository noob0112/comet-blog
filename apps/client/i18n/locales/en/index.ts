import common from './common.json';
import header from './header.json';
import footer from './footer.json';
import home from './home.json';
import posts from './posts.json';
import tags from './tags.json';
import theme from './theme.json';
import language from './language.json';
import error from './error.json';
import meta from './meta.json';

export default {
  common,
  header,
  footer,
  home,
  post: posts,
  tag: tags,
  theme,
  language,
  '404': error.notFound,
  meta,
};
