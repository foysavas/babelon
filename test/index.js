'use strict';

let babelon = require('../index.js');

// locals
let faker = {};
faker.name = {};
faker.name.firstName = function(){ return 'First'; }
faker.name.lastName = function(){ return 'Last'; }
let user_id = 1;
let is_active = true;
let posts = [
  {id: 1},
  {id: 2}
];

let json = babelon.evalFileSync('./test/example.blon', {
  'faker': faker,
  user_id: user_id,
  is_active: true,
  posts: posts,
  misc: {}
});

console.log(json);
