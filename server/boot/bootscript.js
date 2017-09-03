module.exports = function (app) {
    var DappstackDB = app.dataSources.DappstackDB;
    var dappStackUser = app.models.dappStackUser;
    var Role = app.models.Role;
    var Dapp = app.models.dapp;
    var RoleMapping = app.models.RoleMapping;
    var TeamMember = app.models.dappTeamMember;
    var adminPassword = process.env.ADMIN_ROLE_PW

    RoleMapping.settings.strictObjectIDCoercion = true;

    DappstackDB.automigrate('User', function(err) {
        if (err) throw (err);
        
        User.find({ where: { username: 'Admin' }, limit: 1 }, function (err, users) {

            if (!users) {
                User.create([
                    {username: 'Admin', email:'admin@admin.com', password: adminPassword, firstName:'Admin', lastName:'(Administrator)'}
                ], function (err, users) {
                    if (err) return debug(err);

                    console.log('Created users: ', users);

                    //create the admin role
                    Role.create({
                        name: 'admin'
                    }, function(err, role) {
                        if (err) throw err;

                        console.log('Created role:', role);

                        //make bob an admin
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: users[0].id
                        }, function(err, principal) {
                            if (err) throw err;

                            console.log('Created principal:', principal);
                        });
                    });
                })
            }
        });
    });
};