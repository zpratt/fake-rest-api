(function () {
    'use strict';

    var dummyData = require('../dummy-data');

    module.exports = {
        route: {
            path: '/poi',
            method: 'GET',
            config: {
                handler: function (req, reply) {
                    reply(dummyData.createLocations(10));
                }
            }
        }
    };
}());
