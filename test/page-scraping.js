'use strict';

var expect = require('chai').expect;
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
var shiromoji = require('../index');
var scraper = require('search-scraper-jp');

describe('shiromoji', function() {
	
	var counts = [];
	it('shiromoji & count - http://irodori-terrace.com/sports/218/', function(done) {
		var url = 'http://irodori-terrace.com/sports/218/';
		scraper.page(url, function(err, result) {
			shiromoji(result.text, function(err, res) {
				counts.push(shiromoji.count(res));
				done();
			});
		});
	});
	
	it('shiromoji & count - http://mounten-f.com/?p=1180', function(done) {
		var url = 'http://mounten-f.com/?p=1180';
		scraper.page(url, function(err, result) {
			shiromoji(result.text, function(err, res) {
				counts.push(shiromoji.count(res));
				done();
			});
		});
	});
	
	it('shiromoji & count - http://news.golfdigest.co.jp/players/profile/10385/', function(done) {
		var url = 'http://news.golfdigest.co.jp/players/profile/10385/';
		scraper.page(url, function(err, result) {
			shiromoji(result.text, function(err, res) {
				counts.push(shiromoji.count(res));
				done();
			});
		});
	});
	
	it('shiromoji all count', function(done) {
		console.log(shiromoji.countAll(counts).reverse());
		done();
	});
	
});