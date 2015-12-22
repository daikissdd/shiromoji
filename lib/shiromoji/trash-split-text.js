var _ = require('lodash');
var S = require('string');

var trashTexts = [
	',',
	'；',
	"?",
	"!",
	'(',')',
	'（','）',
	'<','>',
	'＜','＞',
	'「','」',
	'＝',
	'[',']',
	'「','」',
	'『','』',
	'”',
	'…','...',
	'・',
	'»',
	'·',
	'　',
	'❌',
];

var creanText = function(baseText) {
	var SS = S(baseText);
	_.each(trashTexts, function(word) {
		SS = SS.replaceAll(word, ' ');
	});
	return SS.s;
};

var splitText = function(baseText) {
	var SS = S(baseText);
	_.each(['。', '、', "！", "？"], function(word) {
		SS = SS.replaceAll(word, '@');
	});
	return SS.s.split('@');
};

module.exports = _.compose(splitText, creanText);
