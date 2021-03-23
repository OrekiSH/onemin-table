const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(path.resolve(__dirname, '../docs/.vuepress/dist'), {
  user: {
    name: 'OrekiSH',
    email: 'orekish@163.com'
  }
}, (err) => {
  console.error(err);
});
