(function () {
    'use strict';

    var hapi = require('hapi'),
        util = require('util'),
        fs = require('fs'),
        path = require('path');

    /*eslint-disable no-sync */
    function addControllers(server) {
        var controllers = fs.readdirSync(path.join(__dirname, './controllers'));

        controllers.forEach(function (controllerPath) {
            var controller = require('./controllers/' + controllerPath);

            server.route(controller.route);
        });
    }
    /*eslint-enable no-sync */

    module.exports = {
        create: function (port) {
            var server = new hapi.Server();
            server.connection({
                port: port
            });

            addControllers(server);

            server.start(function () {
                util.log('listening on port: ' + port);
            });
        }
    };
}());
