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
texts.push(fs.readFileSync('./test/testdata/sample1.txt'));
texts.push(fs.readFileSync('./test/testdata/sample2.txt'));
texts.push(fs.readFileSync('./test/testdata/sample3.txt'));

describe('shiromoji', function() {
	it('lodash method test', function(done) {
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
	
	var arr = [];
	it('shiromoji & count', function(done) {
		async.each(texts, function(text, next) {
			shiromoji(text, function(err, res) {
				var countKeywords = count(res);
				expect(countKeywords).to.be.a('array');
				_.each(countKeywords, function(countKeyword) {
					expect(countKeyword.word).to.be.a('string');
					expect(countKeyword.count).to.be.a('number');
					expect(countKeyword.pageUseCount).to.be.a('number');
				});
				
				arr.push(countKeywords);
				next();
			});
		}, done);
	});
	
	it('all count', function(done) {
		var countAllKeywords = countAll(arr);
		expect(countAllKeywords).to.be.a('array');
		_.each(countAllKeywords, function(countKeyword) {
			expect(countKeyword.word).to.be.a('string');
			expect(countKeyword.count).to.be.a('number');
			expect(countKeyword.pageUseCount).to.be.a('number');
		});
		
		done();
	});
});
