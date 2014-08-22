/**!
 * optimized - benchmark/jsonparse.js
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

var jsonstr = '{"foo": "bar"}';

function jsonparseWithoutTryCatch() {
  return JSON.parse(jsonstr);
}

function jsonparseWithTryCatch() {
  try {
    return JSON.parse(jsonstr);
  } catch (err) {
    return null;
  }
}

function tryCatch(fn, ctx, args) {
  try {
    return fn.apply(ctx, args);
  } catch (e) {
    return e;
  }
}

function jsonparseOutsideTryCatch() {
  var r = tryCatch(JSON.parse, JSON, [jsonstr]);
  // var r = tryCatch(jsonparseWithoutTryCatch, undefined, []);
  if (r instanceof Error) {
    return null;
  }
  return r;
}

var suite = new Benchmark.Suite();

suite
.add('jsonparseWithoutTryCatch()', function() {
  jsonparseWithoutTryCatch();
})
.add('jsonparseWithTryCatch()', function() {
  jsonparseWithTryCatch();
})
.add('jsonparseOutsideTryCatch()', function() {
  jsonparseOutsideTryCatch();
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  JSON.parse with try catch Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });
