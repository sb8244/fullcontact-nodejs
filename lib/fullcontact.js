var querystring = require('querystring');
var http = require("http");

var base = "https://api.fullcontact.com/v2/";

module.exports = function(key) {
	return {
		getUrl: function(endpoint, opts, callback) {
			opts = typeof opts !== 'undefined' ? opts : {};
			opts.apiKey = key;
			var query = querystring.stringify(opts);
			return callback(base + endpoint + "?" + query);
		},
		execute: function(endpoint, opts, callback) {
			this.getUrl(endpoint, opts, function(url) {

			});
		},
		//expose lib.person as the person service and pass in url options
		person: require("./services/person")(this.execute),
	};
}