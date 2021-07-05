import defaults from './defaults';
import Request from './request';
import mergeConfig from './mergeConfig';
import utils from './utils';

import Cancel from './Cancel';
import CancelToken from './CancelToken';

//
function createInstance(defaultConfig) {
  const context = new Request(defaultConfig);
  const instance = Request.prototype.request.bind(context);

  //
  utils.extend(instance, Request.prototype, context);
  utils.extend(instance, context);

  //
  instance.create = function(instanceConfig) {
    //
    if (typeof instanceConfig === 'function') {
      //
      const request = createInstance(mergeConfig(instance.defaults, instanceConfig.defaults));
      //
      request.interceptors.request.handlers = [].concat(
        instanceConfig.interceptors.request.handlers || [],
      );
      //
      request.interceptors.response.handlers = [].concat(
        instanceConfig.interceptors.response.handlers || [],
      );

      //
      return request;
    }

    return createInstance(mergeConfig(instance.defaults, instanceConfig));
  };

  return instance;
}

const request = createInstance(defaults);

request.Request = Request;

request.create = function createRequest(instanceConfig = {}) {
  //
  return createInstance(mergeConfig(request.defaults, instanceConfig));
};

// cancel
request.Cancel = Cancel;
request.CancelToken = CancelToken;

export default request;
