
if (!~process.execArgv.indexOf('--allow-natives-syntax')) {
  console.error('\n  please run with --allow-natives-syntax flag\n');
  process.exit(1);
}

module.exports = require('./optimized');
