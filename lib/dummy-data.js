(function () {
    'use strict';

    var _ = require('lodash'),
        faker = require('faker'),

        locationSkeleton = {
            name: '<string>',
            id: '<integer>',
            start: '2014/07/19 21:00:00',
            percentDone: '10',
            location: '<lat_lng>'
        },

        dataTypeHandlers;

    function randomLatLng() {
        var randomLat = _.random(39.1, 42.1),
            randomLng = _.random(87.1, 100.1);

        return {
            lat: randomLat,
            lng: randomLng - randomLng * 2
        };
    }

    dataTypeHandlers = {
        '<string>': function () {
            return faker.name.lastName();
        },
        '<integer>': function (randomMultiplier) {
            return faker.helpers.randomNumber(randomMultiplier * 10);
        },
        '<lat_lng>': function () {
            return randomLatLng();
        }
    };

    function assignValueBasedOnType(typeSpec, randomMultiplier) {
        var typeHandler = dataTypeHandlers[typeSpec];

        if (typeHandler) {
            return typeHandler(randomMultiplier);
        }

        return typeSpec;
    }

    function createLocations(numberOfLocationsToCreate) {
        var outputData = [];

        _.times(numberOfLocationsToCreate, function () {
            var location = _.clone(locationSkeleton);

            _.each(location, function (typeSpec, key) {
                location[key] = assignValueBasedOnType(typeSpec, numberOfLocationsToCreate);
            });

            outputData.push(location);
        });
        return outputData;
    }

    module.exports = {
        createLocations: createLocations
    };
}());
