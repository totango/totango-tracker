var url = require('url');
var request = require('request');
var querystring = require('querystring');
var extend = require('util')._extend;

var HOSTS = {
    production: "sdr.totango.com",
    eu: "sdr-eu1.totango.com",
    test: "sdr-test.totango.com",
};

module.exports = function (serviceId, env, apiToken) {

    var service_id;
    var api_token;
    var host = HOSTS[env] || HOSTS['production'];

    if (serviceId === undefined || typeof serviceId !== 'string') { throw new Error('Please provide a service id (String)'); }

    service_id = serviceId;
    api_token = apiToken;

    var trackActivityByServiceId = function (accountId, userId, activity, module, callback) {
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
                sdr_m: module,
            };

            sendSDR(params, callback);
        }
    };

    /**
     * Track user activity
     * @param {string} accountId
     * @param {string} userId
     * @param {string} activity
     * @param {string} module
     * @param {function} callback
     * @returns {void}
     * @example trackActivity('account_id', 'user_id', 'User logged-in', 'Login', function(err) {});
     */
    var trackActivity = function(accountId, userId, activity, module, callback) {
        trackActivityByServiceId(accountId, userId, activity, module, callback)
    };

    /**
     * Set user attributes
     * @param {string} accountId
     * @param {string}userId
     * @param {object} attributes - key value pairs of user attributes
     * @param {function} callback
     * @returns {void}
     * @example setUserAttributes('account_id', 'user_id', { 'Number of Open Support Tickets': 3 }, function(err) {});
     */
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

    /**
     * Set account attributes
     * @param {string} accountId
     * @param {object} attributes - key value pairs of user attributes
     * @param {function} callback
     * @returns {void}
     * @example setUserAttributes('account_id', { 'Number of Open Support Tickets': 3 }, function(err) {});
     */
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
           console.log('totango-tracker: Invalid attributes');
        }
        else {

            var params = {
                sdr_s: service_id,
                sdr_o: identity.accountId,
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
        if (api_token) {
            params['api-token'] = api_token;
        }

        var options = {
            url: url.format({
                protocol: 'https',
                host: host,
                pathname: 'pixel.gif/',
                search: querystring.stringify(params)
            }),
            method: 'GET',
            jar: false
        };

        request(options, function(err, res, body) {
            console.log(err);
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
        trackActivityByServiceId: trackActivityByServiceId,
        setUserAttributes : setUserAttributes,
        setAccountAttributes : setAccountAttributes
    };

};
