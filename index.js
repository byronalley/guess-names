#!/usr/bin/env node

var GuessWhoStream = require('./lib/GuessWhoStream');
var jsonStream = require('JSONStream');

process.stdin.setEncoding("utf8"); // convert bytes to utf8 
process.stdin.pipe(new GuessWhoStream())
	.pipe(process.stdout); 
