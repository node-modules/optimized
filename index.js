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

if (process.execArgv.indexOf('--allow-natives-syntax') === -1) {
  console.error('\n  please run with --allow-natives-syntax flag\n');
  process.exit(1);
}

module.exports = require('./optimized');
