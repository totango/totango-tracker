# totango-tracker
Node JS Totango activities, modules and attributes tracker

##Installation
```
$ npm install totango-tracker
```

##Usage
###Create Instance
```js
var tracker = require('totango-tracker')();

tracker.init(serviceId, accountId, userId, { accountName: accountName, userName: userName});

// Examples
tracker.init('SP-1234-01', '123', 'john@anonymous.com');
// init properties with pretty display names
tracker.init('SP-1234-01', '123', 'john@anonymous.com', { accountName: 'Anonymous Industries', userName: 'John Doe'});
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
This npm module is implemented by Sahar Rehani and provided by Totango
