const hogan = require('hogan.js');
const md = require('github-flavored-markdown');

var template= "{{#markdown}}"
+"**{{name}}**"
+"{{/markdown}}";

var context={
  name:"Neal Marlin",
  markdown: function () {
    return function (text) {
      return md.parse(text);
    }
  }
};

var template= hogan.compile(template);
console.log('html:'+template.render(context));
