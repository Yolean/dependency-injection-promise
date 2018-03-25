
// https://github.com/nodejs/node/issues/13678#issuecomment-360059574

var PromiseSubclass = function PromiseSubclass() {
  var self = PromiseSubclass.convert(Promise.resolve());
  return self;
};
PromiseSubclass.convert = function convert(promise, props) {
  promise.__proto__ = PromiseSubclass.prototype;
  return props ? Object.assign(promise, props) : promise;
};
PromiseSubclass.prototype = Object.create(Promise.prototype);
PromiseSubclass.prototype.constructor = PromiseSubclass;
PromiseSubclass.prototype.then = function then(resolve, reject) {
  var returnVal = Promise.prototype.then.call(this, resolve, reject);
  return PromiseSubclass.convert(returnVal);
};

console.log('PromiseSubclass:', typeof PromiseSubclass, PromiseSubclass);

module.exports = PromiseSubclass;
