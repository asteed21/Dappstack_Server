'use strict';

module.exports = function(app) {
    var db = app.dataSources.DappstackDB;

    db.autoupdate(function(err, result) {});
}  