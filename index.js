var kuromoji = require('kuromoji');
var _ = require('lodash');
var S = require('string');
var clearText = require('./clean-ja-text.js');
var splitText = require('./split-ja-text.js');
var pickKeyword = require('./pick-keyword.js');
var isTrash = require('./is-trash.js');

module.exports = function(text, callback) {
	var dic = {dicPath: './node_modules/kuromoji/dist/dict/'};
	
	kuromoji.builder(dic).build(function(err, tokenizer) {
		if (err) return callback(err, null);
		var _keywords = [];
		_.each(splitText(clearText(text)), function(t) {
			var kuromojiWords = tokenizer.tokenize(t);
			_keywords.push(pickKeyword(kuromojiWords));
		});
		
		var keywords = [];
		_.each(_.flatten(_keywords, true), keyword => {
			if (!isTrash(keyword)) keywords.push(keyword);
		});
		callback(null, keywords);
	});
};