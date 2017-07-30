module.exports = function(app) {
    var MongoDB = app.dataSources.DappstackDB;
    var User = app.models.dappStackUser;
    var Role = app.models.Role;
    var Dapp = app.models.dapp;
    var RoleMapping = app.models.RoleMapping;
    var TeamMember = app.models.dappTeamMember;

    RoleMapping.settings.strictObjectIDCoercion = true;

    MongoDB.automigrate([User,Role,Dapp,RoleMapping,TeamMember], function(err) {

        User.create([
            {username: 'Austin', email:'asteed21@gmail.com', password:'123', firstName:'Austin', lastName:'Steed'},
            {username: 'John', email: 'john@doe.com', password: '123', firstName:'John', lastName:'Doe'},
            {username: 'Jane', email: 'jane@doe.com', password: '123', firstName:'Jane', lastName:'Doe'},
            {username: 'Bob', email: 'bob@smith.com', password: '123', firstName:'Bob', lastName:'Smith'}
        ], function(err, users) {
            if (err) throw err;

            console.log('Created users:', users);

            // create a dapp and assign team
        Dapp.create({
            name: 'Status',
            tags: [
                'news',
                'coin',
                'distributed',
                'ICO'
            ],
            status: 'In Progress',
            likes: 5,
            timesFavorited: 8,
            releaseDate: '03/12/18',
            website: 'https://status.im/',
            socialLinks: {
                facebook:'https://www.facebook.com/ethstatus',
                twitter:'https://twitter.com/ethstatus',
                github:'https://github.com/status-im',
                slack:'https://slack.status.im/',
                reddit:'https://www.reddit.com/r/statusim/',
                youtube:'https://www.youtube.com/statusim'
            },
            logoImage: './images/test_pics/status_logo.png',
            featured: false,
            thumbnailDescription: 'Status is a browser, messenger, and gateway to a decentralized world.',
            aboutContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            aboutImages: [
                {id: 1, image: './images/test_pics/status_1.png'},
                {id: 2, image: './images/test_pics/status_2.jpg'},
                {id: 3, image: './images/test_pics/status_3.jpg'}
            ]
        }, function(err, dapp) {
            if (err) throw err;

            console.log('Created project:', dapp);

            // add team members
            TeamMember.create([
                {dappId: dapp.id, memberId: users[0].id,},
                {dappId: dapp.id, memberId: users[1].id},
                {dappId: dapp.id, memberId: users[2].id}
            ], function(err, dappTeam) {
                if (err) throw err;

                console.log('Created team:', dapp.teamMembers);
            });
        });

        //create dapp 2 and assign team
        Dapp.create({
            name: 'Ethlance',
            tags: [
                'jobs',
                'distributed',
                'work'
            ],
            status: 'In Progress',
            likes: 20,
            timesFavorited: 11,
            releaseDate: '12/10/18',
            website: 'https://ethlance.com/',
            socialLinks: {
                facebook:'https://www.facebook.com/ethlance/',
                twitter:'https://twitter.com/ethlance',
                github:'https://github.com/district0x/ethlance',
                slack:'https://district0x-slack.herokuapp.com/'
            },
            logoImage: './images/test_pics/ethlance_logo.png',
            featured: false,
            thumbnailDescription: 'Hire or work for Ether cryptocurrency',
            aboutContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            aboutImages: [
                {id: 1, image: './images/test_pics/ethlance_1.jpg'},
                {id: 2, image: './images/test_pics/ethlance_2.jpg'},
                {id: 3, image: './images/test_pics/ethlance_3.jpeg'}
            ]
        }, function(err, dapp) {
            if (err) throw err;

            console.log('Created project:', dapp);

            // add team members
            TeamMember.create([
                {dappId: dapp.id, memberId: users[3].id,},
                {dappId: dapp.id, memberId: users[2].id}
            ], function(err, dappTeam) {
                if (err) throw err;

                console.log('Created team:', dapp.teamMembers);
            });
        });

        //create dapp 3 and assign team
        Dapp.create({
            name: 'Golem',
            tags: [
                'computation',
                'distributed',
                'resources'
            ],
            status: 'In Progress',
            likes: 242,
            timesFavorited: 141,
            releaseDate: '07/15/18',
            website: 'https://golem.network/',
            socialLinks: {
                facebook:'https://www.facebook.com/golemproject/',
                twitter:'https://twitter.com/golemproject',
                github:'https://github.com/golemfactory/golem',
                slack:'http://golemproject.org:3000/',
                reddit:'https://www.reddit.com/r/GolemProject/'
            },
            logoImage: './images/test_pics/golem_logo.png',
            featured: false,
            thumbnailDescription: 'Worldwide super computer',
            aboutContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            aboutImages: [
                {id: 1, image: './images/test_pics/golem_1.png'},
                {id: 2, image: './images/test_pics/golem_2.jpg'},
                {id: 3, image: './images/test_pics/golem_3.png'}
            ]
        }, function(err, dapp) {
            if (err) throw err;

            console.log('Created project:', dapp);

            // add team members
            TeamMember.create([
                {dappId: dapp.id, memberId: users[0].id,},
                {dappId: dapp.id, memberId: users[1].id}
            ], function(err, dappTeam) {
                if (err) throw err;

                console.log('Created team:', dapp.teamMembers);
            });
        });

        //create dapp 4 and assign team
        Dapp.create({
            name: 'Etherplay',
            tags: [
                'games',
                'distributed',
                'earning'
            ],
            status: 'Live',
            likes: 37,
            timesFavorited: 50,
            releaseDate: '03/03/17',
            website: 'http://etherplay.io/',
            socialLinks: {
                facebook:'https://www.facebook.com/etherplay/',
                twitter:'https://twitter.com/etherplay',
                github:'https://github.com/etherplay'
            },
            logoImage: './images/test_pics/etherplay_logo.jpg',
            featured: false,
            thumbnailDescription: 'Play Games and Win Ether!',
            aboutContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            aboutImages: [
                {id: 1, image: './images/test_pics/etherplay_1.png'},
                {id: 2, image: './images/test_pics/etherplay_2.jpg'},
                {id: 3, image: './images/test_pics/etherplay_3.jpg'}
            ]
        }, function(err, dapp) {
            if (err) throw err;

            console.log('Created project:', dapp);

            // add team members
            TeamMember.create([
                {dappId: dapp.id, memberId: users[2].id,},
                {dappId: dapp.id, memberId: users[1].id}
            ], function(err, dappTeam) {
                if (err) throw err;

                console.log('Created team:', dapp.teamMembers);
            });
        });

        //create dapp 5 and assign team
        Dapp.create({
            name: 'DNN',
            tags: [
                'news',
                'distributed',
                'fake'
            ],
            status: 'In Progress',
            likes: 14,
            timesFavorited: 500,
            releaseDate: '10/07/19',
            website: 'http://dnn.com/',
            socialLinks: {
                facebook:'https://www.facebook.com/dnn/',
                twitter:'https://twitter.com/dnn',
                github:'https://github.com/dnn'
            },
            logoImage: './images/test_pics/dnn_logo.jpeg',
            featured: false,
            thumbnailDescription: 'Decentralized News Network',
            aboutContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            aboutImages: [
                {id: 1, image: './images/test_pics/dnn_1.png'},
                {id: 2, image: './images/test_pics/dnn_2.png'},
                {id: 3, image: './images/test_pics/dnn_3.jpg'}
            ]
        }, function(err, dapp) {
            if (err) throw err;

            console.log('Created project:', dapp);

            // add team members
            TeamMember.create([
                {dappId: dapp.id, memberId: users[0].id,},
                {dappId: dapp.id, memberId: users[3].id}
            ], function(err, dappTeam) {
                if (err) throw err;

                console.log('Created team:', dapp.teamMembers);
            });
        });

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
        });
    });
};