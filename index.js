var url = require('url');
var request = require('request');
var querystring = require('querystring');
var extend = require('util')._extend;


module.exports = function() {

    var self = this;
    var properties = properties || {};

    var init = function(serviceId, accountId, userId, displayNames) {
        var params = {
            sdr_s: serviceId,
            sdr_u: userId,
            sdr_o: accountId
        };
        if (displayNames) {
            params.sdr_odn = displayNames.accountName || '';
            params.sdr_u.name = displayNames.userName || '';
        }
        properties = params;
    };

    var track = function(activity, module, callback) {
        if (typeof activity !== 'string' ||
            typeof module !== 'string' ||
            typeof callback !== 'function') {
            throw new Error('Invalid parameters');
        }

        var params = extend({}, properties);
        params.sdr_a = activity;
        params.sdr_m = module;
        sendSDR(params, callback);
    };

    var setUserAttributes = function(attributes, callback) {
        if (typeof attributes !== 'object' ||
            typeof callback !== 'function') {
            throw new Error('Invalid parameters');
        }
        var params = extend({}, properties);

        for(var attr in attributes) {
            params['sdr_u.' + attr] = attributes[attr];
        }
        sendSDR(params, callback);
    };

    var setAccountAttributes = function(attributes, callback) {
        if (typeof attributes !== 'object' ||
            typeof callback !== 'function') {
            throw new Error('Invalid parameters');
        }
        var params = extend({}, properties);

        for(var attr in attributes) {
            params['sdr_o.' + attr] = attributes[attr];
        }
        sendSDR(params, callback);
    };

    var sendSDR = function(params, callback) {
        var opt = {
            url: url.format({
                protocol: 'https',
                host: 'sdr.totango.com',
                pathname: 'pixel.gif/',
                search: querystring.stringify(params)
            }),
            method: 'GET',
            jar: false
        };

        request(opt, function(err, res, body) {
            if (err) {
                callback(err);
            }
            else if (res.statusCode !== 200 && res.statusCode !== 201) {
                callback(new Error('Invalid request, status code: ' + res.statusCode));
            }
            else {
                callback(null);
            }
        });
    };


    return {
        init: init,
        track : track,
        setUserAttributes : setUserAttributes,
        setAccountAttributes : setAccountAttributes
    };

};
