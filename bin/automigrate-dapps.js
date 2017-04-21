var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.DappstackDB;
ds.automigrate('dapp', function(err) {
  if (err) throw err;

  var dapps = [
    {
      name: 'Money Dapp',
      owners: ['Austin Steed'],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      aboutContent: "Wow, this is another dapp intro statement. WOWWWWW!"
    },
    {
      name: 'Doc Dapp',
      owners: ['Mary Marsh'],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      aboutContent: 'This is an intro statement about the dapp, it will be limited to some amount of something'
    },
  ];
  var count = dapps.length;
  dapps.forEach(function(dapp) {
    app.models.dapp.create(dapp, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});