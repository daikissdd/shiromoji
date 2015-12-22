var _ = require('lodash');
var S = require('string');

var isTrashText = function(text) {
	if (text.length === 0) return true;
	if (text.length === 1 && text.match(new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g))) return true;
	return false;
};

module.exports = function(kuromojiWords) {
	
	var tmp = '';
	var keywords = [];
	_.each(kuromojiWords, function(kuromojiWord, i) {
		var text = kuromojiWord.surface_form;
		
		if (kuromojiWord.pos === '形容詞') {
			keywords.push(tmp);
			keywords.push(text);
			tmp = '';
			return;
		}
		
		if (kuromojiWord.pos !== '名詞' || isTrashText(text)) {
			if (i === 0 || tmp === '') return;
			keywords.push(tmp);
			tmp = '';
			return;
		}
		
		if (tmp.length > 4) {
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