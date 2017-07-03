module.exports = function(app) {
  var User = app.models.DappStackUser;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

User.create([
    {username: 'admin', email: 'admin@dappstack.com', password: '123', joinDate: '05/12/1975'},
    {username: 'user', email: 'user@dappstack.com', password: '123', joinDate: '06/17/2011'}
], function(err, users) {
    if (err) throw err;
    
    console.log('Created users:', users);
    //...
    // Create projects, assign project owners and project team members
    //...
    // Create the admin role
    Role.create({
        name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      // Make admin an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });
};