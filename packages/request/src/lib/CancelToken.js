import Cancel from './Cancel';

function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function');
  }

  let resolver = null;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolver = resolve;
  });

  const token = this;
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    //
    token.reason = new Cancel(message);
    //
    resolver(token.reason);
  });
}

//
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  //
  if (this.reason) {
    //
    throw this.reason;
  }
};

//
CancelToken.source = function source() {
  let cancel;
  //
  const token = new CancelToken(function executor(c) {
    cancel = c;
  });
  //
  return {
    token,
    cancel,
  };
};

export default CancelToken;
