var _ = require('lodash');

module.exports = function(countKeywords) {
	var results = [];
	var words = _(countKeywords).flatten().pluck('word').uniq().value();
	_.each(words, function(word) {
		var init = {word: word, pageUseCount: 0, count: 0};
		var countDataTotal = _.reduce(countKeywords, function(countData, keywords) {
			var matchData = _.find(keywords, function(target) { return word === target.word; }, init);
			if (!matchData) return countData;
			countData.count += matchData.count;
			countData.pageUseCount++;
			return countData;
		}, init);
		results.push(countDataTotal);
	});
	
	return _(results).sortBy('count').sortBy('pageUseCount').reverse().value();
};