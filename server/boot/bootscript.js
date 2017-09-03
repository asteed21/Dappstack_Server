module.exports = function (app) {
    var DappstackDB = app.dataSources.DappstackDB;
    var dappStackUser = app.models.dappStackUser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var adminPassword = process.env.ADMIN_ROLE_PW

    RoleMapping.settings.strictObjectIDCoercion = true;

    DappstackDB.automigrate([dappStackUser,Role,Dapp,RoleMapping,TeamMember], function(err) {
        if (err) throw (err);
        
        dappStackUser.find({ where: { username: 'Admin' }, limit: 1 }, function (err, users) {

            if (!users) {
                dappStackUser.create([
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