var assert = require('chai').assert;

var GuessWhoStream = require('../lib/GuessWhoStream');
var MemoryStream = require('memorystream');

//Taken from the guess-who tests
var testUsernames = {
	'christianbundy': 'christian bundy',
	'johndoe': 'john doe',
	'emmitt.a.riggin': 'emmitt a riggin',
	'meghannyunker': 'meghann yunker',
	'grace.k.baham': 'grace k baham',
	'haroldcrick': 'harold crick',
};

function createSrcStream (testUsernames) {
	var srcStream = new MemoryStream();
	for (var k in testUsernames) {
		srcStream.write(k);
	}
	srcStream.end();

	return srcStream;
}

function createDestStream (testUsernames, done) {
	var destStream = new MemoryStream();
	var todo = Object.keys(testUsernames).length;

	destStream.on('data', function(chunk) {
		var result = chunk.toString();
		var k = result.split(',')[0];
		var expected = k + ',' + testUsernames[k] + '\n';
		assert.equal(expected, result);
		todo--;
	});

	destStream.on('end', function() {
		assert.equal(todo, 0);
		done();
	});

	return destStream;
}

describe('Testing GuessWhoStream', function() {
	it('should take a newline separated stream of usernames and return csv stream of guessed names', function (done) {
    this.timeout(50000);
		var srcStream = createSrcStream(testUsernames);
		var destStream = createDestStream(testUsernames, done);

		srcStream
			.pipe(new GuessWhoStream())
			.pipe(destStream); //.pipe(process.stdout);
	});
});

describe('guess-names command line utility', function() {
	it('should take a newline separated list of username arguments  from stdin and print a CSV list with the guessed names to stdout', function (done) {
    this.timeout(50000);

		var srcStream = createSrcStream(testUsernames);
		var destStream = createDestStream(testUsernames, done);

		var spawn = require('child_process').spawn,
		    cmd = spawn('../index');

		cmd.stdin.setEncoding('utf-8');
		cmd.stdout
			.pipe(new GuessWhoStream())
			.pipe(destStream);

		done();
	});
});
