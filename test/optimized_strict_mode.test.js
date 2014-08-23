/**!
 * optimized - test/optimized_strict_mode.test.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var optimized = require('../');

/**
 * reassign
 */

function defaultArgsReassign(a, b) {
  if (arguments.length < 2) {
    b = 5;
  }
  return b;
}

function reAssignParam1(a, b) {
  if (b === void 0) {
    b = 5;
  }
  return b;
}

function reAssignParam2(a, b) {
  if (b == null) {
    b = 5;
  }
  return b;
}

defaultArgsReassign().should.eql(reAssignParam1());
defaultArgsReassign().should.eql(reAssignParam2());

optimized(defaultArgsReassign).should.equal(true);
optimized(reAssignParam1).should.equal(true);
optimized(reAssignParam2).should.equal(true);

/**
 * try catch
 */

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
  if (r instanceof Error) {
    return null;
  }
  return r;
}

jsonparseOutsideTryCatch().should.eql(jsonparseWithTryCatch());
jsonparseOutsideTryCatch().should.eql(jsonparseWithoutTryCatch());

optimized(jsonparseWithoutTryCatch).should.equal(true);
optimized(jsonparseWithTryCatch).should.equal(false);
optimized(jsonparseOutsideTryCatch).should.equal(true);

/**
 * Leaking arguments
 */

function leaksArguments1() {
  return arguments;
}

function leaksArguments3() {
  var a = arguments;
  return function() {
    return a;
  };
}

function argumentsOutOfBound() {
  return arguments[2];
}

function argumentsAvoidOutOfBound() {
  return arguments.length >= 3 ? arguments[2] : void 0;
}

function argumentsArraySlice() {
  var args = Array.prototype.slice.call(arguments);
}

function argumentsArrayApply() {
  var args = Array.prototype.slice.apply(arguments);
}

function doesntLeakArguments() {
  // .length is just an integer, this doesn't leak
  // the arguments object itself
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    // i is always valid index in the arguments object
    args[i] = arguments[i];
  }
  return args;
}

function functionApplyArugments() {
  var r = argumentsAvoidOutOfBound.apply(undefined, arguments);
}

optimized(leaksArguments1).should.equal(false);
optimized(leaksArguments3).should.equal(false);
optimized(doesntLeakArguments).should.equal(true);
optimized(argumentsOutOfBound).should.equal(false);
optimized(argumentsAvoidOutOfBound).should.equal(true);
optimized(argumentsArraySlice).should.equal(false);
optimized(argumentsArrayApply).should.equal(false);
optimized(functionApplyArugments).should.equal(false);

/**
 * for in
 */

function nonLocalKey1() {
  var obj = {};
  for (var key in obj) {}
  return function() {
    return key;
  };
}

var key;
function nonLocalKey2() {
  var obj = {};
  for (key in obj) {}
}

function localKey1() {
  var obj = {};
  for (var key in obj) {}
}

function localKey2() {
  var obj = {};
  var key;
  for (key in obj) {}
}

optimized(nonLocalKey1).should.equal(false);
optimized(nonLocalKey2).should.equal(false);
optimized(localKey1).should.equal(true);
optimized(localKey2).should.equal(true);

/**
 * The object being iterated is not a "simple enumerable"
 */

function hashTableIteration() {
  var hashTable = {"-": 3};
  // console.log(%HasFastProperties(hashTable));
  // console.log(%HasFastProperties({'1-1': 123}));
  for (var key in hashTable) {}
}

function fastTableIteration() {
  var fastTable = {"_": 3, 'foo_bar': 4};
  // console.log(%HasFastProperties(hashTable));
  // console.log(%HasFastProperties({'1-1': 123}));
  for (var key in fastTable) {}
}

function iteratesOverArray() {
  var arr = [1, 2, 3];
  for (var index in arr) {}
}

function iteratesInArray() {
  var arr = [1, 2, 3];
  for (var i = 0; i < arr.length; i++) {}
}

optimized(hashTableIteration).should.equal(false);
optimized(fastTableIteration).should.equal(true);
optimized(iteratesOverArray).should.equal(false);
optimized(iteratesInArray).should.equal(true);
