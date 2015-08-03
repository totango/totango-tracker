var url = require('url');
var request = require('request');
var querystring = require('querystring');


module.exports = function(serviceId) {

    var service_id;

    if (serviceId === undefined || typeof accountId !== 'string') { throw new Error('Please provide a service id (String)'); }

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
        else { setAttributes('sdr_u.', { accountId: accountId, userId: userId }, attributes, callback); }
    };

    var setAccountAttributes = function(accountId, attributes, callback) {
        if (typeof accountId !== 'string') {
            console.log('totango-tracker.setAccountAttributes: Invalid parameters');
        }
        setAttributes('sdr_o.', { accountId: accountId }, attributes, callback);
    };

    var setAttributes = function(prefix, identity, attributes, callback) {
        callback = callback || function(){};

        if (typeof attributes !== 'object' || typeof callback !== 'function') {
           console.log('totango-tracker.setAttributes: Invalid attributes');
        }
        else {

            var params = {
                sdr_s: service_id,
                sdr_o: accountId
            };
            if (identity.userId) { params.sdr_u = userId; }

            for (var attr in attributes) {
                if (attr === 'user_name') { params['sdr_u.name'] = attributes[attr]; }
                else if (attr === 'account_name') { params['sdr_odn'] = attributes[attr]; }
                else { params[prefix + attr] = attributes[attr]; }
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
