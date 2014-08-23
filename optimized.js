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

function printStatus(fn) {
  var result = 'unknow';
  var optimized = false;
  switch (%GetOptimizationStatus(fn)) {
    case 1:
      result = 'optimized';
      optimized = true;
      break;
    case 2:
      result = 'not optimized';
      optimized = false;
      break;
    case 3:
      result = 'always optimized';
      optimized = true;
      break;
    case 4:
      result = 'never optimized';
      optimized = false;
      break;
    case 6:
      result = 'maybe deoptimized';
      optimized = false;
      break;
  }
  console.log('Function %s is %s', fn._name || fn.name || 'anonymous', result);
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
