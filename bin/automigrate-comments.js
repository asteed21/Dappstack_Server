var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.DappstackDB;
ds.automigrate('Comment', function(err) {
  if (err) throw err;

  var comments = [
    {
      text: 'This is a comment on a dapp.',
      author: 'Austin Steed',
      createdAt: new Date(),
      upVotes: '8',
      downVotes: '27'
    },
    {
      text: 'This is another comment on a dapp.',
      author: 'Ben Brown',
      createdAt: new Date(),
      upVotes: '7',
      downVotes: '21'
    },
  ];
  var count = comments.length;
  comments.forEach(function(comment) {
    app.models.Comment.create(comment, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});