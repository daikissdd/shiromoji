var fs = require('fs');
var text = fs.readFileSync('./test/sample.txt');

var shiromoji = require('../index');

shiromoji(text, function(err, xx) {
	console.log(xx);
});