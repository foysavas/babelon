'use strict';
const fs = require('fs');
const vm = require('vm');
const util = require('util');

let babelon = {};

babelon.compile = function(tmpl) {
  let trans = require("babel-core").transform(`var __babelon_object__ = ${tmpl};`, {
    plugins: [
      "syntax-object-rest-spread",
      "transform-object-rest-spread",
      "transform-es2015-arrow-functions",
      "transform-es2015-shorthand-properties",
      "transform-es2015-spread",
      "transform-es2015-template-literals"
    ]
  });
  let script = new vm.Script(trans.code);
  return (locals) => {
    if (locals == null) { locals = {}; }
    let context = new vm.createContext(locals);
    script.runInContext(context);
    return locals.__babelon_object__;
  }
}

babelon.compileFile = function(filename) {
  let code = fs.readFileSync(filename);
  return babelon.compile(code);
}

babelon.eval = function(tmpl, locals) {
  return babelon.compile(tmpl)(locals);
}

babelon.evalFile = function(filename, locals) {
  return babelon.compileFile(filename)(locals);
}

module.exports = babelon;
