var key = require("./key");
var fullcontact = require("../lib/fullcontact")(key.key());

var validEmail = "bart@fullcontact.com";
var invalidEmail = "notvalid@fullcontact.com";

//perform a few basic tests on baseurl to make sure that it will construct the url as expected
exports.url = {
	baseUrl: function(test) {
		var count = 0;
		var cb = function() {
			if(++count == 3) test.done();
		}
		fullcontact.getUrl("endpoint", {}, function(url) {
			test.equals(url, "/v2/endpoint?apiKey=" + key.key());
			cb();
		});
		fullcontact.getUrl("endpoint", {opt: "opt1"}, function(url) {
			test.equals(url, "/v2/endpoint?opt=opt1&apiKey=" + key.key());
			cb();
		});
		fullcontact.getUrl("endpoint", {opt: "opt1", opt2: "opt2"}, function(url) {
			test.equals(url, "/v2/endpoint?opt=opt1&opt2=opt2&apiKey=" + key.key());
			cb();
		});
	}
}

//Test the execute command which should issue a get request based on the endpoint and opts
exports.execute = {
	/* 
	 * Send a fake request to person.json endpoint with a valid email but without a valid apikey
	 * Expect - 403 status with an "Invalid Api Key" message which should be parsable as JSON
	 */
	testValidRequest: function(test) {
		var tmpFullContact = require("../lib/fullcontact")("nokey");
		tmpFullContact.execute("person.json", {email: validEmail}, function(err, res) {
			var json = JSON.parse(res);
			test.equals(err, null);
			test.equals(json.status, 403);
			test.equals(json.message, "Invalid Api Key");
			test.done();
		});
	}
}

//Test fullcontact.person here, may move into separate file but mocking execute seems not worth it
//These tests require a valid API key
exports.personFindByEmail = {
	/*
	 * Tests using an invalid email
	 * Expect - Either 202 or 404 response and a message
	 */
	testInvalidEmail: function(test) {
		fullcontact.person.findByEmail(invalidEmail, function(err, json) {
			test.equals(err, null);
			//Status and message are always set in the API
			test.notEqual(json.status, undefined);
			test.notEqual(json.message, undefined);
			//Rest of the response is up in the air, it could be 202 or 404 based on timing
			if(json.status != 202 && json.status != 404)
			{
				test.okay(false, "Status is not 202 or 404");
			}
			test.done();
		});
	}
}