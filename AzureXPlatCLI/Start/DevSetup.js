//Bring in all required modules
var scripty = require('azure-scripty');
var nconf = require('nconf');
var async = require('async');

//Load configuration file
nconf.file({ file: 'config.json' });