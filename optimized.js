/**!
 * optimized - index.js
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

var fmt = require('util').format;
require('colors');

function printStatus(fn, args, data) {
  var argsString = '';
  if (args) {
    argsString = args.map(function (a) {
      return JSON.stringify(a);
    }).join(', ');
  }
  console.log(fmt('Function %s(%s) is %s',
    fn._name || fn.name || 'anonymous', argsString, data.result)[data.color]);
}

function detect(fn) {
  var result = 'unknow';
  var optimized = false;
  var color = 'grey';
  switch (%GetOptimizationStatus(fn)) {
    case 1:
      result = 'optimized';
      optimized = true;
      color = 'green';
      break;
    case 2:
      result = 'not optimized';
      optimized = false;
      color = 'red';
      break;
    case 3:
      result = 'always optimized';
      optimized = true;
      color = 'green';
      break;
    case 4:
      result = 'never optimized';
      optimized = false;
      color = 'red';
      break;
    case 6:
      result = 'maybe deoptimized';
      optimized = false;
      color = 'yellow';
      break;
  }
  return {
    optimized: optimized,
    result: result,
    color: color
  };
}

function optimized(fn, args, ctx) {
  // Fill type-info
  if (args) {
    fn.apply(ctx, args);
  } else {
    fn();
  }

  %OptimizeFunctionOnNextCall(fn);

  // The next call
  if (args) {
    fn.apply(ctx, args);
  } else {
    fn();
  }

  // Check
  var data = detect(fn);
  printStatus(fn, args, data);
  return data.optimized;
}

module.exports = optimized;
module.exports.detect = detect;
