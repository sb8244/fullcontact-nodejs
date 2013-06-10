var endpoint = "person.json";

module.exports = function(execute) {
	/*
	 * Abstract out the request execution call for easier invocation
	 * Always return json or error
	 */
	var executeRequest = function(opts, callback) {
		execute(endpoint, opts, function(err, res) {
			if(err) return callback(err, null);
			var json = JSON.parse(res);
			return callback(null, json);
		});
	}
	return {
		/*
		 * Find by Email API takes an email to the person.json endpoint
		 * Return will be a json response unless error
		 */ 
		findByEmail: function(email, callback) {
			executeRequest({email: email}, callback);
		},

		/*
		 * Find by Email API takes an email to the person.json endpoint
		 * Return will be a json response in the dictionary style unless error
		 */ 
		findByEmailDictionary: function(email, callback) {
			executeRequest({email: email, style: "dictionary"}, callback);
		},

		/*
		 * Find by EmailMD5 API takes an md5'ed email to the person.json endpoint
		 * Return will be a json response unless error
		 */ 
		findByEmailMD5: function(emailMD5, callback) {
			executeRequest({emailMD5: emailMD5}, callback);
		},

		/*
		 * Queue by Email API takes an email to the person.json endpoint and submits it for search later
		 * Return will be a json response, always 202
		 */ 
		queueEmail: function(email, callback) {
			executeRequest({email: email, queue: 1}, callback);
		}

		/*
		 * Queue by EmailMD5 takes an md5'ed email to the person.json endpoint
		 * Return will be a json response, always 202
		 */
		queueEmailMD5: function(emailMD5, callback) {
			executeRequest({emailMD5: emailMD5, queue: 1}, callback);
		}


	};
}