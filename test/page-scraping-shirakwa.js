'use strict';

var expect = require('chai').expect;
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
var shiromoji = require('../index');
var scraper = require('search-scraper-jp');

describe('shiromoji', function() {
	var counts = [];
	it('shiromoji & count - http://www.hb-nippon.com/player/1023', function(done) {
		//var url = 'http://www.hb-nippon.com/player/1023';
		var url = 'http://ethan-joumal.com/2937.html';
		scraper.page(url, function(err, result) {
			shiromoji(result.text, function(err, res) {
				console.log(shiromoji.count(res));
				done();
			});
		});
	});
	
});