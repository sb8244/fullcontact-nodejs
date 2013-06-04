var endpoint = "person.json";

module.exports = function(execute) {
	return {
		//find by email api
		findByEmail: function(email, callback) {
			execute(endpoint, {email: email}, function(err, res) {
				if(err) return callback(err, null);
				var json = JSON.parse(res);
				return callback(null, json);
			});
		}
	};
}