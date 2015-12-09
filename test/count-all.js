'use strict';

var expect = require('chai').expect;

var async = require('async');
var _ = require('lodash');
var fs = require('fs');

var shiromoji = require('../index');
var count = shiromoji.count;
var countAll = shiromoji.countAll;

describe('shiromoji Count All', function() {
	it('count-all', function(done) {
		var results = JSON.parse(fs.readFileSync('./test/testdata/results.json'));
		var countAllKeywords = countAll(_.pluck(results, 'countKeywords'));
		
		expect(countAllKeywords).to.be.a('array');
		
		var wordIsHero = _.first(countAllKeywords);
		expect(wordIsHero.word).to.equal('HERO');
		expect(wordIsHero.count).to.equal(35);
		expect(wordIsHero.pageUseCount).to.equal(6);
		
		var wordIsOpen = _(countAllKeywords).pullAt(5).first();
		expect(wordIsOpen.word).to.equal('公開');
		expect(wordIsOpen.count).to.equal(43);
		expect(wordIsOpen.pageUseCount).to.equal(2);
		
		done();
	});
});
