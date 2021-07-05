const { toString } = Object.prototype;

export function isArray(val) {
  //
  return toString.call(val) === '[object Array]';
}
//
export function isEmpty(obj) {
  if (!obj) {
    return true;
  }
  //
  if (obj.length) {
    return false;
  }
  //
  const keys = Object.keys(obj);
  if (keys.length) {
    return false;
  }

  return true;
}

export function isObject(val) {
  return val !== null && typeof val === 'object';
}

export function isDate(val) {
  //
  return toString.call(val) === '[object Date]';
}

export function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    //
    return;
  }

  // Force an array if not already something iterable
  if (!isObject(obj)) {
    /* eslint no-param-reassign:0 */
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i += 1) {
      //
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      //
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

export function merge(...args) {
  //
  const result = {};
  //
  function assignValue(val, key) {
    if (isObject(result[key]) && isObject(val)) {
      //
      result[key] = merge(result[key], val);
    } else {
      //
      result[key] = val;
    }
  }

  for (let i = 0, l = args.length; i < l; i += 1) {
    //
    forEach(args[i], assignValue);
  }
  //
  return result;
}

export function deepMerge(...args) {
  //
  const result = isArray(args[0]) ? [] : {};
  //
  function assignValue(val, key) {
    //
    if (isObject(result[key]) && isObject(val)) {
      //
      result[key] = deepMerge(result[key], val);
    } else if (isObject(val)) {
      //
      if (isArray(val)) {
        //
        result[key] = deepMerge([], val);
      } else {
        //
        result[key] = deepMerge({}, val);
      }
    } else {
      //
      result[key] = val;
    }
  }

  //
  for (let i = 0, l = args.length; i < l; i += 1) {
    //
    forEach(args[i], assignValue);
  }
  //
  return result;
}

export default {
  forEach,
  merge,
  deepMerge,
  isArray,
  isObject,
  isDate,
  isEmpty,
};
