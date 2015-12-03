'use strict';

var expect = require('chai').expect;

var async = require('async');
var _ = require('lodash');
var fs = require('fs');

var shiromoji = require('../index');
var count = shiromoji.count;
var countAll = shiromoji.countAll;

var arr = [];
var texts = [];
texts.push(fs.readFileSync('./test/sample1.txt'));
texts.push(fs.readFileSync('./test/sample2.txt'));
texts.push(fs.readFileSync('./test/sample3.txt'));

describe('shiromoji', () => {
	it('lodash method test', (done) => {
		var arr = [
			'かぼちゃ', 'かぼちゃ',
			'りんご', 'りんご', 'りんご', 'りんご',
			'みかん',
		];
		var arr1 = [
			'かぼちゃ', 'かぼちゃ',
			'ぶどう', 'ぶどう',
			'もも', 'もも', 'もも',
		];
		
		var r1 = _.countBy(arr);
		var r2 = _.uniq(arr);
		var r3 = _.flatten([arr, arr1]);
		done();
	});
	
	it('shiromoji & count', (done) => {
		async.each(texts, (text, next) => {
			shiromoji(text, (err, res) => {
				var countKeywords = count(res);
				expect(countKeywords).to.be.a('array');
				_.each(countKeywords, (countKeyword) => {
					expect(countKeyword.word).to.be.a('string');
					expect(countKeyword.count).to.be.a('number');
					expect(countKeyword.pageUseCount).to.be.a('number');
				});
				
				arr.push(countKeywords);
				next();
			});
		}, done);
	});
	
	it('all count', (done) => {
		var countAllKeywords = countAll(arr);
		expect(countAllKeywords).to.be.a('array');
		_.each(countAllKeywords, (countKeyword) => {
			expect(countKeyword.word).to.be.a('string');
			expect(countKeyword.count).to.be.a('number');
			expect(countKeyword.pageUseCount).to.be.a('number');
		});
		
		done();
	});
});
