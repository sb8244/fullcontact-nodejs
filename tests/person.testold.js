var key = require("./key");

var validEmail = "bart@fullcontact.com";

/*
 * Well I was going to test here, but I decided to move execute into fullcontact.js instead of passing around getUrlMock
 * I'm not sure if it is worth mocking execute or not, but I may end up doing it at a future point in time
 * Feedback?
 */
exports.getByEmail = function(test) {
	//Mock the function everytime in order to control exactly how our request will look
	//The real live API test will occur in fullcontact.test.js
	var getUrlMock = function() {
		return "https://api.fullcontact.com/v2/person.json?apiKey=" + key.key() + "&email=" + validEmail;
	}
	var person = require("../lib/services/person")(getUrlMock);
	person.findByEmail(validEmail, function(err, result) {

		test.done();
	})
}