var text = "paiza（IT/Webエンジニア特化の転職サイト）を運営するギノ株式会社が新規にβ版をリリースした、ブラウザ上でコードを書き、その場で実行できるオンラインのプログラム実行環境です。 メジャーな言語はもちろんの事、Go や Scala なども実行できます。";

var i = require('../index');

i(text, function(err, xx) {
	console.log(xx);
});