import utils from '@tool-developer/wx-utils';
import { RequestError } from './RequestError';

function extend(a, b, thisArg) {
  //
  utils.forEach(b, (val, key) => {
    if (thisArg && typeof val === 'function') {
      //
      a[key] = val.bind(thisArg);
    } else {
      //
      a[key] = val;
    }
  });
  //
  return a;
}

//
export function timeout2Throw(ms, request) {
  return new Promise((_, reject) => {
    const t = setTimeout(() => {
      reject(new RequestError(`timeout of ${ms}ms exceeded`, request));

      clearTimeout(t);
    }, ms);
  });
}

//
export function cancel2Throw({ cancelToken }) {
  return new Promise((_, reject) => {
    //
    if (cancelToken) {
      //
      cancelToken.promise.then(cancel => {
        //
        reject(cancel);
      });
    }
  });
}

export default Object.assign(utils, {
  extend,
});
