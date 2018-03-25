

export default class DependencyInjectionPromise<T> extends Promise<T> {

  resolve: (value?: T | PromiseLike<T>) => void;

  reject: (reason?: any) => void;

  constructor() {
    let captureResolve: (value?: T | PromiseLike<T>) => void;
    let captureReject: (reason?: any) => void;
    const executor: (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void = function(resolve, reject) {
      captureResolve = resolve;
      captureReject = reject;
    }
    super(executor);
    this.resolve = captureResolve;
    this.reject = captureReject;
    console.log('Got resolve and reject now', this.resolve, this.reject);
  }

  providerRegister(executor: (
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void) {

  }

  /*
  then(onfulfilled?: (value: T) => T | PromiseLike<T>, onrejected?: (reason: any) => PromiseLike<never>): Promise<T> {
    return super.then(onfulfilled, onrejected);
  }
  */

}
