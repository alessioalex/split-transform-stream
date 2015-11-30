'use strict';

var split = require('split');
var through = require('through2');
var pump = require('pump-chain');

module.exports = function(inputStream, write, end, splitText) {
  write = write || function(chunk, enc, cb) {
    this.push(chunk);
    cb();
  };

  var splitStream = split(splitText);
  var stream = through({
    objectMode: true
  }, write, end);

  return pump(inputStream, splitStream, stream);
};
