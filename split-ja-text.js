var S = require('string');
var _ = require('lodash');
var config = require('./config');


module.exports = function(baseText) {
	var SS = S(baseText);
	_.each(config.splitWords, function(word) {
		SS = SS.replaceAll(word, config.SPLIT_TEXT);
	});
	return SS.s.split(config.SPLIT_TEXT);
};

