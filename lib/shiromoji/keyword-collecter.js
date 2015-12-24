var _ = require('lodash');
var S = require('string');

var isTrashText = function(text) {
	if (text.length === 0) return true;
	if (text.length === 1 && text.match(new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g))) return true;
	return false;
};

var isNumberText = function(text) {
	return _.isNumber(text*1);
};

module.exports = function(kuromojiWords) {
	
	var tmp = '';
	var isNameSearching = false;
	var keywords = [];
	_.each(kuromojiWords, function(kuromojiWord, i) {
		var text = kuromojiWord.surface_form;
		
		if (kuromojiWord.pos === '形容詞') {
			keywords.push(tmp);
			keywords.push(text);
			tmp = '';
			return;
		}
		
		if (kuromojiWord.pos === '名詞' && kuromojiWord.pos_detail_2 === '人名' && kuromojiWord.pos_detail_3 === '姓') {
			keywords.push(tmp);
			tmp = text;
			isNameSearching = true;
			return;
		}
		
		if (kuromojiWord.pos === '名詞' && kuromojiWord.pos_detail_2 === '人名' && kuromojiWord.pos_detail_3 === '名') {
			tmp += text;
			keywords.push(tmp);
			tmp = '';
			return;
		}
		
		if (kuromojiWord.pos === '接頭詞' && kuromojiWord.pos_detail_1 === '名詞接続') {
			tmp += text;
			return;
		}
		
		if (kuromojiWord.pos !== '名詞' || isTrashText(text)) {
/*
			console.log({
				word: kuromojiWord.surface_form,
				pos: kuromojiWord.pos,
				pos1: kuromojiWord.pos_detail_1,
				pos2: kuromojiWord.pos_detail_2,
			});
*/
			if (i === 0 || tmp === '' || isNameSearching) return;
			keywords.push(tmp);
			tmp = '';
			return;
		}
		
		if (tmp.length > 8) {
			keywords.push(tmp);
			tmp = text;
			return;
		}
		
		if (tmp.length > 3 && _.includes(keywords, tmp)) {
			keywords.push(tmp);
			tmp = text;
			return;
		}
		
		if (i === kuromojiWords.length - 1) { // isLast
			keywords.push(tmp);
			tmp = '';
			return;
		}
		
		tmp += text;
	});
	
	return keywords;
};



