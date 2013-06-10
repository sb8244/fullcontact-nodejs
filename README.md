FullContact NodeJS Library
================

This is a NodeJS helper for the FullContact API - http://www.fullcontact.com/

Much of this readme is taken from the FullContact PHP API - https://github.com/fullcontact/fullcontact-api-php

## Requirements

This assumes you have nodejs installed and setup properly. It is not yet in npm but will be at a later point in time, when it is more stable. 

## Usage

The test suites provide demonstrations of every single type of request call available. The first step is to include fullcontact by requiring it. However, the key must be passed as a parameter:

```javascript
var fullcontact = require("fullcontact")("Your Key here");
```

You can setup the key file a few ways, see the test suite for an example of using a key config file, or just hardcode it in.

Next, you can execute an endpoint api as follows:
```javascript
fullcontact.person.findByEmail("email", function(err, json) {
	//json now contains your information unless err
});
```
A full list of the available API will be prepared shortly.

## Testing

Nodeunit is used for testing. There is a runtests script which will execute any *.test.js file outside of node_modules. You must setup the key for testing by placing your key in the key.config.js file and then renaming it to key.js

## TODO

**This library is not complete but here is the active todo list.**

*  For the Person resource
 *  ~~Implement lookup by email and emailMD5~~
  *  ~~Implement dictionary style for outputting (lookup by email only)~~
  * ~~Implement queue by email~~
 *  ~~Implement lookup by phone~~
  *  ~~Implement countryCode for non-US/Canada phone numbers~~
  *  ~~Implement queue by phone~~
 *  ~~Implement lookup by twitter~~
  *  ~~Implement queue by twitter~~
 *  ~~Implement lookup by facebookUsername~~
  *  ~~Implement queue by facebookUsername~~
 *  Implement lookup by vCard
 *  ~~Implement queue for queue-based processing~~
 *  Implement webhookUrl and webhookId for asynchronous processing
*  For the Name resource
 *  Implement normalization with casing
 *  Implement deducer using email or username with casing
 *  Implement similarity with casing
 *  Implement stats with casing using ~~name, givenName, familyName,~~ and both (givenName and familyName)
 *  Implement parser with casing
*  For the Location resource
 *  Implement normalization using includeZeroPopulation and casing
 *  Implement enrichment using includeZeroPopulation and casing
*  For the Icon resource
 *  Implement the way to get all available icons
 *  Implement icon retrieval using size and type
*  Implement the CardShark resource
*  Implement disposable email address detection
*  Implement account stats retrieval
*  Update the library to be backwards compatible with the previous official version
*  Update the test to use Mocks instead of live API hits.. because it could drain your account credits. Doh.

## License

All code included is Apache License.

Copyright (C) 2013, FullContact and contributors


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.