# totango-tracker
The totango-tracker package is a simple Node.JS package, wrapping the [Totango HTTP API](https://totango.zendesk.com/hc/en-us/articles/203639605-Server-Backend-Integration-HTTP-) used to log user-activity events and/or attribute-updates on accounts.

## Installation
```
$ npm install totango-tracker
```

## Usage

### Install the package
```
$ npm install totango-tracker
```

### Create a tracker Instance
```js
//replace XXXX with your unique Totango service id
const tracker = require('totango-tracker')('SP-XXXX-01');
```

If your data is stored in our EU data center, you will need to specify that in the initialization:
```js
//replace XXXX with your unique Totango service id
const tracker = require('totango-tracker')('SP-XXXX-01', 'eu');
```
### Track Activity
```js
tracker.trackActivity(accountId, userId, activity, module, function(err){
    if (err) {
        // handle the error
    }
    else {
        // Success
    }
});

// Example
tracker.trackActivity('YYYYY', 'john@anonymous.com', 'some activity', 'some module', function(err){
    ...
});
```

### Set Account Attribute(s)
```js
tracker.setAccountAttributes(accountId, {
    'Attribute1'    : 'value1',
    'Attribute2'    : 'value2',
    }, function(err) {
         if (err) {
            // handle the error
        }
        else {
            // Success
        }
    }
);
```

### Set User Attribute(s)
```js
tracker.setUserAttributes(accountId, userId, {
    'Attribute1'    : 'value1',
    'Attribute2'    : 'value2',
    }, function(err) {
         if (err) {
            // handle the error
        }
        else {
            // Success
        }
    }
);
```

## License

https://www.totango.com/terms-of-use