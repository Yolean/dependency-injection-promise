import DependencyInjectionPromise from './DependencyInjectionPromise';

describe("DependencyInjectionPromise", () => {

  xit("The only type of dependency injection we do is lazy singleton");

  xit("Transitive dependencies are not injected, which means the lib has no opinion about constructor/setter injection");

  describe("Promise-like API", () => {

    it("Takes no constructor argument, so that a promise+type can be declared synchronously in config", () => {
      new DependencyInjectionPromise<number>();
    });

  });

  describe(".providerRegister", () => {

    it("Expects an executor that can be invoked on first .then", () => {
      let promise = new DependencyInjectionPromise<number>();
      /*promise.providerRegister((resolve, reject) => {

      });*/
    });

    it("Throws if there is already a provider", () => {

    });

  });

  describe(".then", () => {

    it("Throws (synchronously) if no provider has been registered, because we expect such registration immediately on import config", () => {
      let promise = new DependencyInjectionPromise<number>();
      try {
        promise.then(value => null);
      } catch (e) {
        expect(e.message);
        expect(e.message).toMatch(/No provider registered for this dependency injection/);
      }
    });

    it("Provides the dependency if it has been resolved", done => {
      let promise = new DependencyInjectionPromise<number>();
      promise.then(value => {
        expect(value);
        done();
      });
    });

  });

});
