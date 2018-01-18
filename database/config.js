var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
    port     : '5432',
    user     : 'tepig',
    password : '',
    database: 'meetup',
    charset  : 'utf8'
  }
});

// connect with database selected
knex.schema.createTableIfNotExists('users', function (table) {
  table.string('username');
  table.string('password');
  table.string('name');
  table.string('email');
  table.increments('id');
  table.timestamps('created_at');
  table.timestamps('last_login');
  table.string('age');
  table.string('profilepic');
  table.string('biography');
  table.string('name');
})
.then(function() {
 });
var DB = require('bookshelf')(knex);

module.exports.DB = DB;


