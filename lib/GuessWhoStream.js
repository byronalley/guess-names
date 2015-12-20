var guessWho = require('guess-who');
var StringDecoder = require('string_decoder').StringDecoder;
var Transform = require("stream").Transform;
var util = require("util");

var GuessWhoStream = function () {
	this.names = {};
	Transform.call(this, { "objectMode": true }); // Call constructor
}

util.inherits(GuessWhoStream, Transform); // inherit Transform

GuessWhoStream.prototype._transform = function (buffer, encoding, processed) {
	var decoder = new StringDecoder('utf8');
	var usernames = decoder.write(buffer).trim().split("\n");
	var remaining = usernames.length;
	var transform = this;

	var callback = function (username, name) {
		remaining--;
		transform.push(username + ',' + name.join(' ') + '\n');
		if (remaining === 0) {
			processed();
		}
	}

	guessWho(usernames, callback);
}

GuessWhoStream.prototype._flush = function (done) {
	this.end();
	done();
}

module.exports = GuessWhoStream;
