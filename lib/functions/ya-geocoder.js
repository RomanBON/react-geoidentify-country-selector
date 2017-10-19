'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Request module
 * @type {request|exports|module.exports}
 */
var request = require('request');

var YaGeocoder = function () {
    function YaGeocoder(options) {
        _classCallCheck(this, YaGeocoder);
    }

    _createClass(YaGeocoder, [{
        key: 'resolve',
        value: function resolve(query, options, callback) {

            if (!query) {
                return callback(new Error('No address specified'));
            }

            if (typeof options == 'function') {
                callback = options;
                options = {};
            }

            var geoRequest = this.buildRequest(query, options);

            this.resolveQuery(geoRequest, options, callback);
        }
    }, {
        key: 'buildRequest',
        value: function buildRequest(query, options) {

            var results = options.results || 10;
            var q = 'geocode=' + encodeURIComponent(query) + '&results=' + results + '&format=json&lang=en-US';

            if (options.kind) {
                q += '&kind=' + options.kind;
            }

            return q;
        }
    }, {
        key: 'resolveQuery',
        value: function resolveQuery(geoRequest, options, callback) {
            var _this = this;

            request.get({
                url: 'https://geocode-maps.yandex.ru/1.x/?' + geoRequest,
                json: true,
                timeout: options.timeout || 60000
            }, function (err, response, body) {

                var collection = [];

                if (err) {
                    return callback(err);
                }

                if (!body) {
                    return callback(null, collection);
                }

                if (body.error) {
                    return callback(new Error(body.error.message));
                }

                if (!body.response) {
                    return callback(new Error('Empty response, address not resolved'));
                }

                body.response.GeoObjectCollection.featureMember.forEach(function (item) {

                    var geoObject = item.GeoObject;

                    var refinedGeoObject = _this.refineGeoObject(geoObject);

                    if (refinedGeoObject != null) {
                        collection.push(refinedGeoObject);
                    }
                });

                callback(null, collection);
            });
        }
    }, {
        key: 'refineGeoObject',
        value: function refineGeoObject(geoObject) {

            var administrativeArea = geoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea;
            var countryCode = geoObject.metaDataProperty.GeocoderMetaData.Address.country_code;

            if (!administrativeArea) {
                return null;
            }

            var geoCoordinates = geoObject.Point.pos.split(' ');
            var locality = void 0;
            var Thoroughfare = void 0;
            var Premise = void 0;

            var geo = {
                longitude: geoCoordinates[0],
                latitude: geoCoordinates[1],
                obl: administrativeArea.AdministrativeAreaName,
                country_code: countryCode
            };

            if (administrativeArea.hasOwnProperty('SubAdministrativeArea')) {

                locality = administrativeArea.SubAdministrativeArea.Locality;
                geo.raion = administrativeArea.SubAdministrativeArea.SubAdministrativeAreaName;

                if (locality) {
                    geo.place = locality.LocalityName;
                } else {
                    return null;
                }
            } else {

                locality = administrativeArea.Locality;

                if (locality) {
                    geo.geoRaion = locality.LocalityName;
                } else {
                    return null;
                }
            }

            if (locality.hasOwnProperty('DependentLocality')) {

                if (locality.DependentLocality.hasOwnProperty('Premise')) {

                    geo.place = locality.DependentLocality.DependentLocalityName;
                    Premise = locality.DependentLocality.Premise;
                    geo.house = Premise.PremiseNumber;
                } else if (locality.DependentLocality.hasOwnProperty('Thoroughfare')) {

                    Thoroughfare = locality.DependentLocality.Thoroughfare;

                    geo.street = Thoroughfare.ThoroughfareName;

                    if (Thoroughfare.hasOwnProperty('Premise')) {
                        if (Thoroughfare.Premise.hasOwnProperty('PremiseNumber')) {
                            geo.house = Thoroughfare.Premise.PremiseNumber;
                        }
                    }
                } else if (locality.DependentLocality.hasOwnProperty('DependentLocality')) {

                    var DependentLocality2 = locality.DependentLocality.DependentLocality;
                    geo.place = DependentLocality2.DependentLocalityName;
                } else {

                    geo.place = locality.DependentLocality.DependentLocalityName;
                }
            } else {

                if (locality.hasOwnProperty('Thoroughfare')) {

                    Thoroughfare = locality.Thoroughfare;
                    geo.street = Thoroughfare.ThoroughfareName;

                    if (Thoroughfare.hasOwnProperty('Premise')) {
                        geo.house = Thoroughfare.Premise.PremiseNumber;
                    }
                }
            }

            var addressArr = [geo.obl];

            if (geo.raion) {
                addressArr.push(geo.raion);
            }

            if (geo.place) {
                addressArr.push(geo.place);
            }

            if (geo.street) {
                addressArr.push(geo.street);
            }

            if (geo.house) {
                addressArr.push(geo.house);
            }

            if (geo.country_code) {
                addressArr.push(geo.country_code);
            }

            geo.address = addressArr.join(', ');

            return geo;
        }
    }]);

    return YaGeocoder;
}();

module.exports = YaGeocoder;