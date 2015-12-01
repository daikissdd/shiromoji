var _ = require('lodash');

module.exports = function(kuromojiWords) {
	var tmp = '';
	var keywords = [];
	_.each(kuromojiWords, (kuromojiWord, i) => {
		if (kuromojiWord.pos !== '名詞') {
			if (i === 0 || tmp === '') return;
			keywords.push(tmp);
			return tmp = '';
		};
		tmp += kuromojiWord.surface_form;
		if (i === kuromojiWords.length - 1) keywords.push(tmp);
	});
	return keywords;
};