'use strict';

let fs = require('fs');

let babelon = {};

babelon.evalFileSync = function(filename, locals) {
  let tmpl = fs.readFileSync(filename);
  let trans = require("babel-core").transform(`(${tmpl});`, {
    plugins: [
      "transform-es2015-template-literals",
      "transform-es2015-arrow-functions"
    ]
  });
  let localNames = [];
  let localValues = [];
  for (let name in locals) {
    localNames.push(name);
    localValues.push(locals[name]);
  }
  return (new Function(...localNames, `return ${trans.code}`))(...localValues);
}

module.exports = babelon;
