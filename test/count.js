var _ = require('lodash');

var arr = [
	'かぼちゃ',
	'かぼちゃ',
	'かぼちゃ',
	'かぼちゃ',
	'かぼちゃ',
	'りんご',
	'りんご',
	'りんご',
	'りんご',
	'りんご',
	'りんご',
	'りんご',
	'みかん',
];

var arr1 = [
	'かぼちゃ',
	'かぼちゃ',
	'ぶどう',
	'ぶどう',
	'もも',
	'もも',
	'もも',
	'もも',
];

var r = _.countBy(arr);
r = _.uniq(arr);

console.log(_.flatten([arr, arr1]));