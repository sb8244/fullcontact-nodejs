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
		}
	};
}