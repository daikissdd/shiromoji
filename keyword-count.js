var _ = require('lodash');

module.exports = function(keywords) {
	var keyVal2obj = function(val, key) {
		return { word: key, count: val}
	}
	return _(keywords).countBy().map(keyVal2obj).sortBy('count').reverse().value();
};