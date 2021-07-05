/**
 * Request Object
 * see https://github.com/axios/axios
 *
 */

import InterceptorManager from './interceptorManager';
import dispatchRequest from './dispatch';
import utils from './utils';
import mergeConfig from './mergeConfig';

function Request(instanceConfig) {
  //
  this.defaults = instanceConfig || {};
  //
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}
//
Request.prototype.request = function(opts) {
  //
  const chain = [dispatchRequest, undefined];
  //
  opts = mergeConfig(this.defaults, opts || {});

  // method
  opts.method = opts.method || 'get';
  opts.method = opts.method.toLowerCase();

  // headers
  opts.headers = opts.headers || {};

  //
  let promise = Promise.resolve(opts);
  //
  this.interceptors.request.forEach(interceptor => {
    //
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  //
  this.interceptors.response.forEach(interceptor => {
    //
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  //
  while (chain.length) {
    //
    promise = promise.then(chain.shift(), chain.shift());
  }
  //
  return promise;
};

//
utils.forEach(['delete', 'get', 'head', 'options', 'post', 'put', 'patch'], function forEachMethod(
  method,
) {
  //
  Request.prototype[method] = function(action, data, options) {
    //
    if (typeof action === 'object') {
      //
      options = utils.merge(action, {
        method,
      });
      //
      return this.request(options);
    }
    //
    options = utils.merge(options || {}, {
      method,
    });
    //
    return this.request(
      Object.assign(
        {
          action,
          data,
        },
        options,
      ),
    );
  };
});

export default Request;
