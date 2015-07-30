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
var tracker = require('totango-tracker')();

// serviceId -> your unique Totango service id
tracker.init(serviceId, accountId, userId, { accountName: accountName, userName: userName});

// Examples
tracker.init('SP-1234-01', '4567', 'john@anonymous.com');
// OPTIONAL: init properties with pretty display names
tracker.init('SP-1234-01', '4567', 'john@anonymous.com', { accountName: 'Anonymous Industries', userName: 'John Doe'});
```

###Track Activity
```js
tracker.track('some activity', 'some module', function(err){
  if (err) { console.log(err.message()); }
  // Success
});
```

###Set Account Attribute(s)
```js
tracker.setAccountAttributes({
  'Attribute1' : 'value1',
  'Attribute2' : 'value2',
  }, function(err){
  if (err) { console.log(err.message()); }
  // Success
});
```

###Set User Attribute(s)
```js
tracker.setUserAttributes({
  'Attribute1' : 'value1',
  'Attribute2' : 'value2',
  }, function(err){
  if (err) { console.log(err.message()); }
  // Success
});
```

##Credits
This npm module is implemented by [saharrehani](https://github.com/saharrehani) and provided by [Totango](http://www.totango.com)
