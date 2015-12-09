var kuromoji = require('kuromoji');
var _ = require('lodash');
var S = require('string');
var clearText = require('./lib/clean-ja-text.js');
var splitText = require('./lib/split-ja-text.js');
var pickKeyword = require('./lib/pick-keyword.js');
var isTrash = require('./lib/is-trash.js');

var shiromoji = function(text, callback) {
	var dic = {dicPath: './node_modules/kuromoji/dist/dict/'};
	kuromoji.builder(dic).build(function(err, tokenizer) {
		if (err) return callback(err, null);
		var _keywords = [];
		_.each(splitText(clearText(text)), function(t) {
			var kuromojiWords = tokenizer.tokenize(t);
			_keywords.push(pickKeyword(kuromojiWords));
		});
		
		var keywords = [];
		_.each(_.flatten(_keywords, true), function(keyword) {
			if (!isTrash(keyword)) keywords.push(keyword);
		});
		callback(null, keywords);
	});
};

shiromoji.count = require('./lib/keyword-count');
shiromoji.countAll = require('./lib/keyword-count-all');

module.exports = shiromoji;