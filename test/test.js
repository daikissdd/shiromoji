var _ = require('lodash');
var fs = require('fs');
var text1 = fs.readFileSync('./test/sample1.txt');
var text2 = fs.readFileSync('./test/sample2.txt');
var text3 = fs.readFileSync('./test/sample3.txt');

var shiromoji = require('../index');
var count = shiromoji.count;
var countAll = shiromoji.countAll;

var arr = [];
shiromoji(text1, function(err, k1) {
	arr.push(count(k1));
	shiromoji(text1, function(err, k2) {
		arr.push(count(k2));
		shiromoji(text1, function(err, k3) {
			arr.push(count(k3));
			console.log(countAll(arr).reverse());
		});
	});
});