var endpoint = "person.json";

module.exports = function(execute) {
	return {
		/*
		 * Find by Email API takes an email to the person.json endpoint
		 * Return will be a json response unless error
		 */ 
		findByEmail: function(email, callback) {
			execute(endpoint, {email: email}, function(err, res) {
				if(err) return callback(err, null);
				var json = JSON.parse(res);
				return callback(null, json);
			});
		},

		/*
		 * Find by EmailMD5 API takes an md5'ed email to the person.json endpoint
		 * Return will be a json response unless error
		 */ 
		findByEmailMD5: function(emailMD5, callback) {
			execute(endpoint, {emailMD5: emailMD5}, function(err, res) {
				if(err) return callback(err, null);
				var json = JSON.parse(res);
				return callback(null, json);
			});
		},

		queueEmail: function(email, callback) {
			execute(endpoint, {email: email, queue: 1}, function(err, res) {
				if(err) return callback(err, null);
				var json = JSON.parse(res);
				return callback(null, json);
			});
		}
	};
}