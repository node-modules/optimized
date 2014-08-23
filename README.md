optimized
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/optimized.svg?style=flat-square
[npm-url]: https://npmjs.org/package/optimized
[travis-image]: https://img.shields.io/travis/node-modules/optimized.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/optimized
[gittip-image]: https://img.shields.io/gittip/fengmk2.svg?style=flat-square
[gittip-url]: https://www.gittip.com/fengmk2/
[david-image]: https://img.shields.io/david/node-modules/optimized.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/optimized
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/optimized.svg?style=flat-square
[download-url]: https://npmjs.org/package/optimized

Detect a function can be optimized or not.
Original tools come from [Optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)

## Install

```bash
$ npm install optimized --save-dev
```

## Usage

`test.js`:

```js
var optimized = require('optimized');

function defaultArgsReassign(a, b) {
  if (arguments.length < 2) b = 5;
}

function reAssignParam(a, b) {
  if (b === void 0) b = 5;
}

// optimized(fn, args, ctx) => true / false
optimized(defaultArgsReassign, [1, 2]);
optimized(reAssignParam);
```

Run it with `--allow-natives-syntax --trace_opt --trace_deopt`:

```bash
$ node --allow-natives-syntax --trace_opt --trace_deopt test.js

Function defaultArgsReassign is not optimized
Function reAssignParam is optimized
```

## Test

```bash
$ npm install
$ npm test
```

## License

(The MIT License)

Copyright (c) 2014 fengmk2 &lt;fengmk2@gmail.com&gt; and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
