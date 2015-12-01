var kuromoji = require('kuromoji');
var _ = require('lodash');
var S = require('string');
var clearText = require('./clean-ja-text.js');
var splitText = require('./split-ja-text.js');
var pickKeyword = require('./pick-keyword.js');

module.exports = function(text, callback) {
	var dic = {dicPath: './node_modules/kuromoji/dist/dict/'};
	
	kuromoji.builder(dic).build(function(err, tokenizer) {
		if (err) return callback(err, null);
		var keywords = [];
		_.each(splitText(clearText(text)), function(t) {
			var kuromojiWords = tokenizer.tokenize(t);
			keywords.push(pickKeyword(kuromojiWords));
		});
		callback(null, keywords);
	});
};