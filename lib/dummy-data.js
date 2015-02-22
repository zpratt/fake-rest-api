(function () {
    'use strict';

    var _ = require('lodash'),
        faker = require('faker'),

        stringType = '<string>',
        intType = '<integer>',
        latLngType = '<lat_lng>',

        locationSkeleton = {
            name: '<string>',
            id: '<integer>',
            start: '2014/07/19 21:00:00',
            percentDone: '10',
            location: latLngType
        };

    function randomLatLng() {
        var randomLat = _.random(39.1, 42.1),
            randomLng = _.random(87.1, 100.1);

        return {
            lat: randomLat,
            lng: randomLng - randomLng * 2
        };
    }

    function createLocations(numberOfLocationsToCreate) {
        var outputData = [];

        _.times(numberOfLocationsToCreate, function () {
            var location = _.clone(locationSkeleton);

            _.each(location, function (value, key) {
                if (value === stringType) {
                    location[key] = faker.name.lastName();
                }

                if (value === intType) {
                    location[key] = faker.helpers.randomNumber(numberOfLocationsToCreate * 10);
                }

                if (value === latLngType) {
                    location[key] = randomLatLng();
                }
            });

            outputData.push(location);
        });
        return outputData;
    }

    module.exports = {
        createLocations: createLocations
    };
}());
