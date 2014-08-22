/**!
 * optimized - benchmark/forin_obj.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');

var suite = new Benchmark.Suite();

// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#521-objects-that-are-in-hash-table-mode-aka-normalized-objects-dictionary-mode---objects-who-have-a-hash-table-as-a-backing-data-structure-are-not-simple-enumerables

suite
.add('valid identifiers', function() {
  var obj = {'foo': 'bar', 'aka_1': 1};
  for (var k in obj) {}
})
.add('invalid identifiers', function() {
  var obj = {'foo': 'bar', 'aka-1': 1};
  for (var k in obj) {}
})
.add('outside constructor', function() {
  var obj = {'foo': 'bar'};
  obj['aka_1'] = 1;
  for (var k in obj) {}
})
.add('delete properties', function() {
  var obj = {'foo': 'bar', 'aka_1': 1, 'delete': 123};
  delete obj.delete;
  for (var k in obj) {}
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  for in object Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });
