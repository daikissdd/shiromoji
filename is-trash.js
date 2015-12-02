var S = require('string');
var jaco = require('jaco');

module.exports = function(text) {
	if (text.length === 0) return true;
	if (S(text).isEmpty()) return true;
	if (S(text * 1).isNumeric()) return true;
	
	var j = new jaco.Jaco(text);
	if (text.length < 2) {
		if (j.isOnlyKatakana()) return true;
		if (S(text).isAlphaNumeric()) return true;
		if (text.match(new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g))) return true;
	}
	if (text.length < 3) {
		if (j.isOnlyHiragana()) return true;
	}
	return false;
};