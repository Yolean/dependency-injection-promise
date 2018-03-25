

export interface Dependency<T> extends PromiseLike<T> {

  setProvider(executor: (
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void): void;

}

export class DependencyLazy<T> implements Dependency<T> {

  executor: (
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void = null;
  promise: Promise<T> = null;

  setProvider(executor: (
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void): void {
    if (this.executor !== null) throw new Error('A dependency provider has already been set');
    this.executor = executor;
  }

  // https://github.com/Microsoft/TypeScript/blob/v2.8.1/lib/lib.es5.d.ts#L1305
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2> {
    if (this.executor === null) throw new Error('No dependency provider has been set');
    if (this.promise === null) {
      this.promise = new Promise<T>(this.executor);
    }
    return this.promise.then(onfulfilled, onrejected);
  }

}

export class DependencyPromise<T> extends Promise<T> implements Dependency<T> {

  setProvider(executor: (
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void): void {
    throw new Error('This dependency is a regular Promise with no need for a provider');
  }

}
