var querystring = require('querystring');
var https = require("https");

var host = "api.fullcontact.com";
var port = 443;
var base = "/v2/";


module.exports = function(key) {

    var getUrl = function(endpoint, opts, callback) {
        opts = typeof opts !== 'undefined' ? opts : {};
        opts.apiKey = key;
        var query = querystring.stringify(opts);
        return callback(base + endpoint + "?" + query);
    }

    var execute = function(endpoint, opts, callback) {
        getUrl(endpoint, opts, function(url) {
            var options = {
                host: host,
                port: port,
                path: url,
                method: 'GET'
            };
            https.get(options, function(res) {
                var content = "";
                res.on('data', function (chunk) {
                    content += chunk;
                });
                res.on('end', function(){
                    return callback(null, content);
                });
            }).on('error', function(err) {
                return callback(err, null);
            });
        });
    }

    /*
     * Expose public API calls
     */
    return {
        getUrl: getUrl,
        execute: execute,
        //expose lib.person as the person service and pass in execute function
        person: require("./services/person")(execute),
    };
}