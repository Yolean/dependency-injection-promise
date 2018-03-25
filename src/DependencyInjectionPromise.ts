

export default class DependencyInjectionPromise<T> extends Promise<T> {

  resolve: (value?: T | PromiseLike<T>) => void;

  reject: (reason?: any) => void;

  constructor() {
    let captureResolve: (value?: T | PromiseLike<T>) => void;
    let captureReject: (reason?: any) => void;
    super((resolve, reject) => {
      captureResolve = resolve;
      captureReject = reject;
    });
    this.resolve = captureResolve;
    this.reject = captureReject;
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
