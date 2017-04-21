var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.DappstackDB;
ds.automigrate('DappStackUser', function(err) {
  if (err) throw err;

  var dappStackUsers = [
    {
      firstName: 'Austin',
      lastName: 'Steed',
      joinDate: new Date(),
      role: 'user',
      email: 'asteed21@gmail.com',
      username: 'asteed21',
      password: 'test',
      favorites: ['1','2']
    },
    {
      firstName: 'Charlie',
      lastName: 'Morris',
      joinDate: new Date(),
      role: 'user',
      email: 'chtmorris@gmail.com',
      username: 'chtmorris',
      password: 'test',
      favorites: ['2']
    },
  ];
  var count = dappStackUsers.length;
  dappStackUsers.forEach(function(dappStackUser) {
    app.models.DappStackUser.create(dappStackUser, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});