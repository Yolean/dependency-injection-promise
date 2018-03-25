
const DependencyInjectionPromise = require('./DependencyInjectionPromise.js');

describe("DependencyInjectionPromise", () => {

  it("Is a Promise-like class", () => {
    console.log('Depen', typeof DependencyInjectionPromise);
    expect(typeof DependencyInjectionPromise === 'function');
  });

  it("Is a promise without a constructor arg", () => {
    let promise = new DependencyInjectionPromise();
    promise.then(value => {});
  });

  it("Eventually resolves to something", done => {
    let promise = new DependencyInjectionPromise();
    promise.then(value => {
      done();
    });
  });

});
