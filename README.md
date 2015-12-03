shiromoji.js
---

[![Circle CI](https://circleci.com/gh/daikissdd/search-scraper-jp.svg?style=svg)](https://circleci.com/gh/daikissdd/search-scraper-jp)

# Search engine & page content scrapping

## Using 

```
shiromoji(text, (err, res) => {
	var countKeywords = count(res);
	expect(countKeywords).to.be.a('array');
	_.each(countKeywords, (countKeyword) => {
		expect(countKeyword.word).to.be.a('string');
		expect(countKeyword.count).to.be.a('number');
		expect(countKeyword.pageUseCount).to.be.a('number');
	});
});

var countAllKeywords = countAll([countKeywords1, countKeywords2, countKeywords3]);
expect(countAllKeywords).to.be.a('array');
_.each(countAllKeywords, (countKeyword) => {
	expect(countKeyword.word).to.be.a('string');
	expect(countKeyword.count).to.be.a('number');
	expect(countKeyword.pageUseCount).to.be.a('number');
});
```