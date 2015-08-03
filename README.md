# totango-tracker
[Totango](http://www.totango.com) is a SaaS analytics solution for tracking your users, improve conversion
and rention.
This is a Node.js tracker module for activities, modules and attributes - wrapping Totango's [REST API](https://totango.zendesk.com/hc/en-us/articles/203639605-Server-Backend-Integration-HTTP-)

##Installation
```
$ npm install totango-tracker
```

##Usage
###Create Instance
```js
var tracker = require('totango-tracker')(**serviceId**);

// Example: serviceId -> your unique Totango service id
var tracker = require('totango-tracker')('SP-XXXX-01');
```

###Track Activity
```js
tracker.**trackActivity**(**accountId**, **userId**, **activity**, **module**, function(err){
    if (err) { console.log(err.message()); }
    else {
    // Success
    }
});

// Example
tracker.trackActivity('YYYYY', 'john@anonymous.com', 'some activity', 'some module', function(err){
    if (err) { console.log(err.message()); }
    else {
    // Success
    }
});
```

###Set Account Attribute(s)
```js
tracker.**setAccountAttributes**(**accountId**, {
    'Attribute1'    : 'value1',
    'Attribute2'    : 'value2',
    'name'          : 'Anonymous Industries'  // The display name for the account
    }, function(err) {
        if (err) { console.log(err.message()); }
        // Success
    }
);
```

###Set User Attribute(s)
```js
tracker.**setUserAttributes**(**accountId**, **userId**, {
    'Attribute1'    : 'value1',
    'Attribute2'    : 'value2',
    'name'          : 'John Doe'    // The display name for the user
    }, function(err) {
        if (err) { console.log(err.message()); }
        // Success
    }
);
```

##Credits
This npm module is implemented by [saharrehani](https://github.com/saharrehani) and provided by [Totango](http://www.totango.com)
