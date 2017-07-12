module.exports = function(app) {
    var MongoDB = app.dataSources.DappstackDB;

    MongoDB.automigrate('dappStackUser', function(err) {
        if (err) throw (err);

        var dappStackUser = app.models.dappStackUser;

        dappStackUser.create([
            {username:'Admin', email:'admin@admin.com', password:'123', firstName:'Sam', lastName:'Steed', owner:false},
            {username:'Austin', email:'asteed21@gmail.com', password:'123', firstName:'Austin', lastName:'Steed', owner:false}
        ], function(err, users) {
            if (err) throw(err);

            var Role = app.models.Role;
            var RoleMapping = app.models.RoleMapping;

            //create an admin role
            Role.create({
                name: 'admin'
            }, function(err, role) {
                if (err) throw (err);

                //assign the admin
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: users[0].id
                }, function(err, principal) {
                    if (err) throw (err);
                });
            });
        });
    });
};