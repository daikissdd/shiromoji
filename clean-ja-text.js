var S = require('string');
var _ = require('lodash');
var config = require('./config');

module.exports = function(baseText) {
	var SS = S(baseText);
	_.each(config.eraseWords, function(word) {
		SS = SS.replaceAll(word, ' ');
	});
	return SS.s;
};