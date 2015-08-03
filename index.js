var url = require('url');
var request = require('request');
var querystring = require('querystring');
var extend = require('util')._extend;


module.exports = function(serviceId) {

    var service_id;

    if (serviceId === undefined || typeof serviceId !== 'string') { throw new Error('Please provide a service id (String)'); }

    service_id = serviceId;

    var trackActivity = function(accountId, userId, activity, module, callback) {
        callback = callback || function(){};

        if (typeof accountId !== 'string' ||
            typeof userId !== 'string' ||
            typeof activity !== 'string' ||
            typeof module !== 'string' ||
            typeof callback !== 'function') {
            console.log('totango-tracker.trackActivity: Invalid parameters');
        }
        else {
            var params = {
                sdr_s: service_id,
                sdr_o: accountId,
                sdr_u: userId,
                sdr_a: activity,
                sdr_m: module
            };

            sendSDR(params, callback);
        }
    };

    var setUserAttributes = function(accountId, userId, attributes, callback) {
        if (typeof accountId !== 'string' || typeof userId !== 'string') {
            console.log('totango-tracker.setUserAttributes: Invalid parameters');
        }
        else {
            var initialParams = {};
            if (attributes['name']) {
                initialParams['sdr_u.name'] = attributes['name'];
                delete attributes.name;
            }
            setAttributes('sdr_u.', initialParams, { accountId: accountId, userId: userId }, attributes, callback);
        }
    };

    var setAccountAttributes = function(accountId, attributes, callback) {
        if (typeof accountId !== 'string') {
            console.log('totango-tracker.setAccountAttributes: Invalid parameters');
        }
        else {
            var initialParams = {};
            if (attributes['name']) {
                initialParams['sdr_odn'] = attributes['name'];
                delete attributes.name;
            }
            setAttributes('sdr_o.', initialParams, { accountId: accountId }, attributes, callback);
        }
    };

    var setAttributes = function(prefix, initialParams, identity, attributes, callback) {
        callback = callback || function(){};

        if (typeof attributes !== 'object' || typeof callback !== 'function') {
           console.log('totango-tracker.setAttributes: Invalid attributes');
        }
        else {

            var params = {
                sdr_s: service_id,
                sdr_o: identity.accountId
            };
            if (identity.userId) { params['sdr_u'] = identity.userId; }
            params = extend(params, initialParams);

            for (var attr in attributes) {
                params[prefix + attr] = attributes[attr];
            }

            sendSDR(params, callback);
        }
    };

    var sendSDR = function(params, callback) {

        var options = {
            url: url.format({
                protocol: 'https',
                host: 'sdr.totango.com',
                pathname: 'pixel.gif/',
                search: querystring.stringify(params)
            }),
            method: 'GET',
            jar: false
        };

        request(options, function(err, res, body) {
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
        trackActivity : trackActivity,
        setUserAttributes : setUserAttributes,
        setAccountAttributes : setAccountAttributes
    };

};
