module.exports = function (app) {
    var DappstackDB = app.dataSources.DappstackDB;
    DappstackDB.automigrate('dappStackUser', function (err) {
        if (err) throw (err);
        var dappStackUser = app.models.dappStackUser;
        dappStackUser.find({ where: { username: 'Admin' }, limit: 1 }, function (err, users) {

        if (!users) {


            dappStackUser.create([
            { username: 'Admin', email: 'admin@admin.com', password: '123' }
            ], function (err, users) {
                if (err) return debug(err);

                var Role = app.models.Role;
                var RoleMapping = app.models.RoleMapping;

                Role.destroyAll();
                RoleMapping.destroyAll();

                //create the admin role
                Role.create({
                    name: 'admin'
            }, function (err, role) {
                if (err) return debug(err);

                //make admin
                role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
                }, function (err, principal) {
                if (err) throw (err);
                });
            });
            })
        }
        else {

        }

        });
    });
};