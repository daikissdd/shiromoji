var _ = require('lodash');

module.exports = function(keywords) {
	var data = [];
	var countData = _.countBy(keywords);
	for (var key in countData) data.push({word: key, count: countData[key], pageUseCount: 1});
	return _.sortBy(data, 'count').reverse();
};