var key = require("./key");
var fullcontact = require("../lib/fullcontact")(key.key());

//perform a few basic tests on baseurl to make sure that it will construct the url as expected
exports.url = {
	baseUrl: function(test) {
		var count = 0;
		var cb = function() {
			if(++count == 3) test.done();
		}
		fullcontact.getUrl("endpoint", {}, function(url) {
			test.equals(url, "https://api.fullcontact.com/v2/endpoint?apiKey=" + key.key());
			cb();
		});
		fullcontact.getUrl("endpoint", {opt: "opt1"}, function(url) {
			test.equals(url, "https://api.fullcontact.com/v2/endpoint?opt=opt1&apiKey=" + key.key());
			cb();
		});
		fullcontact.getUrl("endpoint", {opt: "opt1", opt2: "opt2"}, function(url) {
			test.equals(url, "https://api.fullcontact.com/v2/endpoint?opt=opt1&opt2=opt2&apiKey=" + key.key());
			cb();
		});
	}
}

//Test the execute command which should issue a get request based on the endpoint and opts
exports.execute = {

}

//Test fullcontact.person here, may move into separate file but mocking execute seems not worth it
exports.person = {

}