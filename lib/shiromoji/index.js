var kuromoji = require('kuromoji');
var _ = require('lodash');
var keywordCollecter = require('./keyword-collecter');
var trashSplitText = require('./trash-split-text');
var trashFilter = require('./trash-filter');

var dic = {dicPath: './node_modules/kuromoji/dist/dict/'};

module.exports = function(text, callback) {
	kuromoji.builder(dic).build(function(err, tokenizer) {
		if (err) return callback(err, null);
		
		var kuromojinize = function(text) {
			return keywordCollecter(tokenizer.tokenize(text));
		};
		
		var _k = _.map(trashSplitText(text), kuromojinize);
		var keywords = _.filter(_.flatten(_k, true), trashFilter);
		callback(null, keywords);
	});
};