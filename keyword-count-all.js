var _ = require('lodash');

module.exports = function(countKeywords) {
	var results = [];
	var pickMatchWord = function(key) {
		var match = _.find(this, function(target) { return key === target.word; });
		if (!match) return;
		
		var existWord = _.find(results, function(target) { return match.word === target.word; });
		if (existWord) {
			existWord.count += existWord.count;
			existWord.pageUseCount++;
			return;
		}
		
		match.pageUseCount = 1;
		results.push(match);
	};
	
	var keys = _(countKeywords).flatten().pluck('word').uniq().value();
	_.each(countKeywords, function(keywords) {
		_.each(keys, pickMatchWord, keywords);
	});
	
	return results;
};