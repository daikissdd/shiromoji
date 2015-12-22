var S = require('string');
var jaco = require('jaco');

module.exports = function(text) {
	if (text.length === 0) return false;
	if (S(text).isEmpty()) return false;
	if (S(text * 1).isNumeric()) return false;
	
	var j = new jaco.Jaco(text);
	if (text.length < 2) {
		if (j.isOnlyKatakana()) return false;
		if (S(text).isAlphaNumeric()) return false;
		if (text.match(new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g))) return false;
	}
	if (text.length < 3) {
		if (j.isOnlyHiragana()) return false;
	}
	return true;
};