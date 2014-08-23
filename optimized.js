/**!
 * optimized - optimized.js
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

function printStatus(fn) {
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
  console.log(fmt('Function %s is %s', fn._name || fn.name || 'anonymous', result)[color]);
  return optimized;
}

function optimized(fn) {
  var args = [].slice.call(arguments, 1);
  //Fill type-info
  fn.apply(fn, args);

  %OptimizeFunctionOnNextCall(fn);

  //The next call
  fn.apply(fn, args);

  //Check
  return printStatus(fn);
}

module.exports = optimized;
