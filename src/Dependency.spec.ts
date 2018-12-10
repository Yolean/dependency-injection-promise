import { Dependency, DependencyLazy, DependencyPromise } from './Dependency';

describe("DependencyPromise", () => {

  it("Is merely a regular promise", done => {
    let dependency = new DependencyPromise<number>((resolve, reject) => {
      setTimeout(resolve.bind(null, 123), 1);
    });
    dependency.then(value => {
      expect(value).toBe(123);
      done();
    });
  });

  it("Has a setProvider method that always throws", () => {
    let dependency = new DependencyPromise<number>((resolve, reject) => {});
    try {
      dependency.setProvider((resolve, reject) => {});
      fail("Should have thrown when trying to set a provider to a DependencyPromise");
    } catch (e) {
      expect(e.message).toMatch(/no need for a provider/);
    }
  });

});

describe("DependencyInjectionLazy", () => {

  xit("The only type of dependency injection we do is lazy singleton", () => {});

  xit("Transitive dependencies are not injected, which means the lib has no opinion about constructor/setter injection", () => {});

  describe("Promise-like API", () => {

    it("Takes no constructor argument, so that the promise can be declared synchronously in config", () => {
      new DependencyLazy<number>();
    });

  });

  describe(".setProvider", () => {

    it("Expects an executor that can be invoked on first .then", done => {
      let promise = new DependencyLazy<number>();
      let executorCalled = false;
      promise.setProvider((resolve, reject) => {
        executorCalled = true;
        setTimeout(resolve.bind(null, 234), 10);
      });
      expect(executorCalled).toBeFalsy();
      promise.then(value => {
        expect(value).toBe(234);
        done();
      });
      expect(executorCalled).toBeTruthy();
    });

    it("Throws if there is already a provider", () => {
      let lazy = new DependencyLazy<number>();
      lazy.setProvider((resolve, reject) => resolve(5));
      try {
        lazy.setProvider((resolve, reject) => resolve(6));
        fail("Should have thrown on a second setProvider call");
      } catch (e) {
        expect(e.message).toMatch(/provider has already been set/);
      }
    });

  });

  describe(".then", () => {

    it("Throws (synchronously) if no provider has been registered, because we expect such registration immediately on import config", () => {
      let promise = new DependencyLazy<number>();
      try {
        promise.then(value => null);
      } catch (e) {
        expect(e.message);
        expect(e.message).toMatch(/No dependency provider has been set/);
      }
    });

    it("Provides the dependency again and again", done => {
      let promise = new DependencyLazy<number>();
      promise.setProvider(resolve => resolve(9));
      promise.then(value => expect(value).toBe(9));
      promise.then(value => {
        expect(value).toBe(9);
        done();
      });

    });

  });

  describe("Promise.all", () => {

    it("DependencyLazy is compatible, so different injection types can be combined", done => {
      let promise = new DependencyPromise<boolean>((resolve, reject) => resolve(true));
      let lazy = new DependencyLazy<number>();
      lazy.setProvider((resolve, reject) => resolve(42));
      Promise.all([promise, lazy]).then(([p, l]) => {
        expect(p).toBeTruthy();
        expect(l).toBe(42);
        done();
      });
    });

  });

  describe("Instantiation as-is", () => {

    let received = null;

    let receiver = function(depPropmise: Dependency<string>) {
      received = depPropmise;
    }

    it("Type declarations are ok with a promise from new without generic type", () => {
      let p = new DependencyPromise((resolve, reject) => {
        resolve("Resolved!");
      });
      receiver(p);
      expect(received).toBe(p);
    });

  });

});
