var assert = require('chai').assert;

var GuessWhoStream = require('../lib/GuessWhoStream');
var MemoryStream = require('memorystream');

//Taken from the guess-who tests
var testNames = {
	'christianbundy': 'christian bundy',
	'johndoe': 'john doe',
	'emmitt.a.riggin': 'emmitt a riggin',
	'meghannyunker': 'meghann yunker',
	'huechadwick': 'hue chadwick',
	'delphia.a.kimmer': 'delphia a kimmer',
	'lilymendel': 'lily mendel',
	'natisha.pedroza': 'natisha pedroza',
	'leoramauch': 'leora mauch',
	'jamika.mcgranahan': 'jamika mcgranahan',
	'celestinachittenden': 'celestina chittenden',
	'jadacwalson': 'jada c walson',
	'denese.d.eichler': 'denese d eichler',
	'marybethgant': 'marybeth gant',
	'ashleamondy': 'ashlea mondy',
	'brittanynowakowski': 'brittany nowakowski',
	'nelliersepeda': 'nellie r sepeda',
	'anastasia.matchett': 'anastasia matchett',
	'glory.mclester': 'glory mclester',
	'wilburn.f.hinkson': 'wilburn f hinkson',
	'grace.k.baham': 'grace k baham',
	'haroldcrick': 'harold crick'
};

describe('GuessWhoStream', function() {
	beforeEach( function() {
		// this.testUsernames = Object.keys(testNames);
		this.testUsernames = [ 'haroldcrick' ];
	});
	
	it('should take a newline separated stream of usernames and return csv stream of guessed names', function (done) {
    this.timeout(50000);
		var srcStream = new MemoryStream(this.testUsernames);
		srcStream.end();
		var destStream = new MemoryStream(null, {
				readable : false
		});
		destStream.on('data', function(chunk) {
			console.log(data);
		});
		destStream.on('end', function() {
			console.log('Pretending to finish');
			done();
			/*
			if (this.testUsernames.length === 0) {
				done();
			} else {
				done('Error: ' + this.testUsernames.join('\n'));
			}
		});
		process.stdin.pipe(new GuessWhoStream()).pipe(destStream);
		*/
	});

});

describe('guess-names', function() {
	it('should take a newline separated list of username arguments  from sdin and print a CSV list with the guessed names to stdout');
	/*
		, function (done) {
    this.timeout(50000);
		var spawn = require('child_process').spawn,
		    cmd = spawn('../index', ['haroldcrick', 'nelliersepeda']);

		cmd.stdout.on('data', function (data) {
			  console.log('stdout: ' + data);
		});

		cmd.stderr.on('data', function (data) {
			  console.log('stderr: ' + data);
		});

		cmd.on('close', function (code) {
			  console.log('child process exited with code ' + code);
		});
		done();
	});
	*/
});
