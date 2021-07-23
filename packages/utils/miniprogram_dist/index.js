function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var toString = Object.prototype.toString;

function isArray(val) {
  //
  return toString.call(val) === '[object Array]';
} //


function isEmpty(obj) {
  if (!obj) {
    return true;
  } //


  if (obj.length) {
    return false;
  } //


  var keys = Object.keys(obj);

  if (keys.length) {
    return false;
  }

  return true;
}

function isObject(val) {
  return val !== null && _typeof(val) === 'object';
}

function isDate(val) {
  //
  return toString.call(val) === '[object Date]';
}

function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    //
    return;
  } // Force an array if not already something iterable


  if (!isObject(obj)) {
    /* eslint no-param-reassign:0 */
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i += 1) {
      //
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    var keys = Object.keys(obj);

    for (var _i = 0; _i < keys.length; _i += 1) {
      var key = keys[_i]; //

      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

function merge() {
  //
  var result = {}; //

  function assignValue(val, key) {
    if (isObject(result[key]) && isObject(val)) {
      //
      result[key] = merge(result[key], val);
    } else {
      //
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i += 1) {
    //
    forEach(i < 0 || arguments.length <= i ? undefined : arguments[i], assignValue);
  } //


  return result;
}

function deepMerge() {
  //
  var result = isArray(arguments.length <= 0 ? undefined : arguments[0]) ? [] : {}; //

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
  } //


  for (var i = 0, l = arguments.length; i < l; i += 1) {
    //
    forEach(i < 0 || arguments.length <= i ? undefined : arguments[i], assignValue);
  } //


  return result;
}

var index = {
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  isArray: isArray,
  isObject: isObject,
  isDate: isDate,
  isEmpty: isEmpty
};

export default index;
export { deepMerge, forEach, isArray, isDate, isEmpty, isObject, merge };
