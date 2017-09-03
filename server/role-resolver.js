module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('dappTeamMember', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    // if the target model is not dapp
    if (context.modelName !== 'dapp') {
      return reject();
    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    // check if userId is in team table for the given project id
    context.model.findById(context.modelId, function(err, dapp) {
      if (err || !dapp)
        return reject();

      console.log(userId);
      var Team = app.models.dappTeamMember;
      Team.count({
        dappId: dapp.id,
        memberId: userId
      }, function(err, count) {
        if (err) {
          console.log(err);
          return cb(null, false);
        }

        cb(null, count > 0); // true = is a team member
      });
    });
  });
};