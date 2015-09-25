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
		 * Use the person method to request more information about a specific person by email. 
		 * @param email The email address of the person being looked up. 
		 * @param callback Callback(err,json)
		 */ 
		findByEmail: function(email, callback) {
			executeRequest({email: email}, callback);
		},

		/*
		 * Use the person method to request more information about a specific person by email.
		 * @param email The email address of the person being looked up.
		 * @param webhookUrl The webhook url to send the FullContact response to (as json)
		 * @param webhookId The id string you wish to be sent with the response json
		 * @param callback Callback(err,json)
		 */
		 findByEmailWebhookIdRespJson: function(email, webhookUrl, webhookId, callback) {
		 	executeRequest({
		 		email: email,
		 		webhookUrl: webhookUrl,
		 		webhookId: webhookId,
		 		webhookBody: "json"
		 	}, callback);
		 }

		/*
		 * Use the person method to request more information about a specific person by email. 
		 * The json will be restructured as a dictionary 
		 * @param email The email address of the person being looked up. 
		 * @param callback Callback(err,json)
		 */ 
		findByEmailDictionary: function(email, callback) {
			executeRequest({email: email, style: "dictionary"}, callback);
		},

		/*
		 * Use the person method to request more information about a specific person by MD5'd email. 
		 * @param email The email address of the person being looked up. 
		 * @param callback Callback(err,json)
		 */
		findByEmailMD5: function(emailMD5, callback) {
			executeRequest({emailMD5: emailMD5}, callback);
		},

		/*
		 * Queue an email for later lookup (within 24 hours). 
		 * @param email The email address of the person being looked up. 
		 * @param callback Callback(err,json)
		 */
		queueEmail: function(email, callback) {
			executeRequest({email: email, queue: 1}, callback);
		},

		/*
		 * Queue an MD5 email for later lookup (within 24 hours)
		 * @param email The email address of the person being looked up
		 * @param callback Callback(err,json)
		 */
		queueEmailMD5: function(emailMD5, callback) {
			executeRequest({emailMD5: emailMD5, queue: 1}, callback);
		},


		/*
		 * Experimental API which will search by phone and countryCode
		 * @param phone Phone parameter like +13037170414
		 * @param ISO-3166 two-digit country code (Great Britain = GB) or explicitly default to US 
		 * @param callback Callback(err,json)
		 */
		findByPhone: function(phone, countryCode, callback) {
			executeRequest({phone: phone, countryCode: countryCode}, callback);
		},

		/*
		 * Queue a phone for later lookup (within 24 hours)
		 * @param phone Phone parameter like +13037170414
		 * @param ISO-3166 two-digit country code (Great Britain = GB) or explicitly default to US 
		 * @param callback Callback(err,json)
		 */
		queuePhone: function(phone, countryCode, callback) {
			executeRequest({phone: phone, countryCode: countryCode, queue: 1}, callback);
		},

		/*
		 * Use the person method to request more information about a specific person by twitter. 
		 * @param twitterHandle The twitter handle of the person to look up
		 * @param callback Callback(err, json)
		 */
		findByTwitter: function(twitterHandle, callback) {
			executeRequest({twitter: twitterHandle}, callback);
		},

		/*
		 * Queue a twitter lookup for later
		 * @param twitterHandle The twitter handle of the person to look up
		 * @param callback Callback(err, json)
		 */
		queueTwitter: function(twitterHandle, callback) {
			executeRequest({twitter: twitterHandle, queue: 1}, callback);
		},

		/*
		 * Use the person method to request more information about a specific person by facebook username. 
		 * @param username The facebook username of the person to look up
		 * @param callback Callback(err, json)
		 */
		findByFacebook: function(username, callback) {
			executeRequest({facebookUsername: username}, callback);
		},

		/*
		 * Queue a facebook username lookup for later
		 * @param username The facebook username of the person to look up
		 * @param callback Callback(err, json)
		 */
		queueFacebook: function(username, callback) {
			executeRequest({facebookUsername: username, queue: 1}, callback);
		},
	};
}