var _ = require('lodash');
var S = require('string');

var isTrashText = function(text) {
	if (text.length === 0) return true;
	if (text.length === 1) {
		if (text.match(new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g))) return true;
	}
};

module.exports = function(kuromojiWords) {
	var tmp = '';
	var keywords = [];
	_.each(kuromojiWords, function(kuromojiWord, i) {
		var text = kuromojiWord.surface_form;
		
		var isNoun = (kuromojiWord.pos !== '名詞');
		if (isNoun || isTrashText(text)) {
			if (i === 0 || tmp === '') return;
			keywords.push(tmp);
			tmp = '';
			return;
		}
		
		var isInclude = S(tmp).include(text);
		if (isInclude || tmp.length < 6) {
			keywords.push(tmp);
			tmp = text;
			return;
		}
		
		var isLast = (i === kuromojiWords.length - 1);
		if (isLast) {
			keywords.push(tmp);
			tmp = '';
			return;
		}
		
		tmp += text;
	});
	return keywords;
};