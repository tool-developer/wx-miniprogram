import utils from './utils';

const { isObject, deepMerge } = utils;

export default function mergeConfig(config1 = {}, config2 = {}) {
  //
  const config = {};

  //
  function mergeDeepProperties(val, prop) {
    // data and body not to merge
    if (['body', 'data'].includes(prop)) {
      //
      config[prop] = val;
    } else if (isObject(config2[prop])) {
      //
      config[prop] = deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      //
      config[prop] = config2[prop];
    } else if (isObject(config1[prop])) {
      //
      config[prop] = deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      //
      config[prop] = config1[prop];
    }
  }
  //
  utils.forEach(config1, mergeDeepProperties);
  utils.forEach(config2, mergeDeepProperties);

  //
  return config;
}
