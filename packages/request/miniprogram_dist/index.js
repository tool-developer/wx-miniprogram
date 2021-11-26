import Adapter from './adapter/defaultAdapter.js';

var defaults = {
  timeout: 3000,
  headers: {
    Accept: 'application/json'
  },
  method: 'get',
  requestType: 'json',
  responseType: 'json',
  dataArrayFormat: 1,
  // 1:key=1&key=2&key=3; 2:key[]=1&key[]=2&key[]=3; 3:key=1,2,3;
  prefix: '',
  // url = baseURL + prefix + action
  dataPlaceholderRemoved: false,
  // remove url placeholder data parameter
  resolvedCatch: false,
  // when exception to enter catch
  dataRequestEncode: 'rfc3986' // request url encode

};

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$2()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var RequestError = /*#__PURE__*/function (_Error) {
  _inherits(RequestError, _Error);

  var _super = _createSuper$1(RequestError);

  function RequestError(text, request) {
    var _this;

    _classCallCheck(this, RequestError);

    _this = _super.call(this, text);
    _this.ok = false;
    _this.name = 'RequestError';
    _this.request = request;
    return _this;
  }

  return RequestError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

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

function isObject$1(val) {
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


  if (!isObject$1(obj)) {
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
    if (isObject$1(result[key]) && isObject$1(val)) {
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

function deepMerge$1() {
  //
  var result = isArray(arguments.length <= 0 ? undefined : arguments[0]) ? [] : {}; //

  function assignValue(val, key) {
    //
    if (isObject$1(result[key]) && isObject$1(val)) {
      //
      result[key] = deepMerge$1(result[key], val);
    } else if (isObject$1(val)) {
      //
      if (isArray(val)) {
        //
        result[key] = deepMerge$1([], val);
      } else {
        //
        result[key] = deepMerge$1({}, val);
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
  deepMerge: deepMerge$1,
  isArray: isArray,
  isObject: isObject$1,
  isDate: isDate,
  isEmpty: isEmpty
};

function extend(a, b, thisArg) {
  //
  index.forEach(b, function (val, key) {
    if (thisArg && typeof val === 'function') {
      //
      a[key] = val.bind(thisArg);
    } else {
      //
      a[key] = val;
    }
  }); //

  return a;
} //


function timeout2Throw(ms, request) {
  return new Promise(function (_, reject) {
    var t = setTimeout(function () {
      reject(new RequestError("timeout of ".concat(ms, "ms exceeded"), request));
      clearTimeout(t);
    }, ms);
  });
} //


function cancel2Throw(_ref) {
  var cancelToken = _ref.cancelToken;
  return new Promise(function (_, reject) {
    //
    if (cancelToken) {
      //
      cancelToken.promise.then(function (cancel) {
        //
        reject(cancel);
      });
    }
  });
}

var utils = Object.assign(index, {
  extend: extend
});

function IterceptorManager() {
  //
  this.handlers = [];
} //


IterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
}; //


IterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

IterceptorManager.prototype.forEach = function forEach(fn) {
  //
  utils.forEach(this.handlers, function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};

function buildURL(url, options) {
  var _ref = options || {},
      params = _ref.params,
      dataArrayFormat = _ref.dataArrayFormat,
      dataSerializer = _ref.dataSerializer,
      dataRequestEncode = _ref.dataRequestEncode;

  if (!params) {
    return url;
  } // URL RFC3986
  // https://tools.ietf.org/html/rfc3986#section-2.2
  // https://github.com/DavidTPate/rfc-3986#readme
  // https://www.cnblogs.com/zhao1949/p/9871042.html
  // 允许包含字符：(A-Za-z0-9-_.!~*'():/?#[]@$&'+,;=`)
  // encodeURIComponent不会编码处理字符:A-Za-z0-9-_.!~*'()
  // => :/?#[]@$&'+,;=`
  // => ;/?:@&=+$,
  // => #[]


  function encode(val) {
    //
    if (!dataRequestEncode) {
      //
      return val;
    } //


    if (dataRequestEncode === 'encodeURIComponent') {
      //
      return encodeURIComponent(val);
    }

    if (typeof dataRequestEncode === 'function') {
      //
      return dataRequestEncode(val);
    } //


    if (utils.isArray(val)) {
      //
      return val;
    } //


    return encodeURIComponent(val) // .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }

  var serializedParams = null;

  if (dataSerializer) {
    //
    serializedParams = dataSerializer(params);
  } else {
    //
    var parts = []; //

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        //
        return;
      }

      if (utils.isArray(val)) {
        if (dataArrayFormat === 2) {
          key += '[]'; // key[]=1&key[]=2&key[]=3
        } else {
          key += ''; // key=1&key=2&key=3
        }
      } else {
        val = [val];
      }

      var arr3 = [];
      utils.forEach(val, function parseValue(v) {
        //
        if (utils.isDate(v)) {
          //
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          //
          v = JSON.stringify(v);
        }

        if (dataArrayFormat === 3) {
          //
          arr3.push(encode(v));
        } else {
          //
          parts.push("".concat(encode(key), "=").concat(encode(v)));
        }
      }); // key=1,2,3

      if (dataArrayFormat === 3 && arr3.length > 0) {
        //
        parts.push("".concat(encode(key), "=").concat(arr3.join(',')));
      }
    }); //

    serializedParams = parts.join('&');
  } //


  if (serializedParams) {
    //
    var hashmarkIndex = url.indexOf('#'); //

    if (hashmarkIndex !== -1) {
      //
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  } //


  return url;
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var ResponseError = /*#__PURE__*/function (_Error) {
  _inherits(ResponseError, _Error);

  var _super = _createSuper(ResponseError);

  function ResponseError(response, text, data, request) {
    var _this;

    _classCallCheck(this, ResponseError);

    _this = _super.call(this, text || response.statusText);
    _this.ok = false;
    _this.name = 'ResponseError';
    _this.data = data;
    _this.response = response;
    _this.request = request;
    return _this;
  }

  return ResponseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var queryString = {};

var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = '\uFFFD';
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

var decodeUriComponent = function (encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return customDecodeURIComponent(encodedURI);
  }
};

var splitOnFirst = (string, separator) => {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  const separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};

var filterObj = function (obj, predicate) {
  var ret = {};
  var keys = Object.keys(obj);
  var isArr = Array.isArray(predicate);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];

    if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
      ret[key] = val;
    }
  }

  return ret;
};

(function (exports) {
  const strictUriEncode$1 = strictUriEncode;
  const decodeComponent = decodeUriComponent;
  const splitOnFirst$1 = splitOnFirst;
  const filterObject = filterObj;

  const isNullOrUndefined = value => value === null || value === undefined;

  const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case 'index':
        return key => (result, value) => {
          const index = result.length;

          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [...result, [encode(key, options), '[', index, ']'].join('')];
          }

          return [...result, [encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')];
        };

      case 'bracket':
        return key => (result, value) => {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [...result, [encode(key, options), '[]'].join('')];
          }

          return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
        };

      case 'comma':
      case 'separator':
      case 'bracket-separator':
        {
          const keyValueSep = options.arrayFormat === 'bracket-separator' ? '[]=' : '=';
          return key => (result, value) => {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            } // Translate null to an empty string so that it doesn't serialize as 'null'


            value = value === null ? '' : value;

            if (result.length === 0) {
              return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
            }

            return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
          };
        }

      default:
        return key => (result, value) => {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          }

          if (value === null) {
            return [...result, encode(key, options)];
          }

          return [...result, [encode(key, options), '=', encode(value, options)].join('')];
        };
    }
  }

  function parserForArrayFormat(options) {
    let result;

    switch (options.arrayFormat) {
      case 'index':
        return (key, value, accumulator) => {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, '');

          if (!result) {
            accumulator[key] = value;
            return;
          }

          if (accumulator[key] === undefined) {
            accumulator[key] = {};
          }

          accumulator[key][result[1]] = value;
        };

      case 'bracket':
        return (key, value, accumulator) => {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, '');

          if (!result) {
            accumulator[key] = value;
            return;
          }

          if (accumulator[key] === undefined) {
            accumulator[key] = [value];
            return;
          }

          accumulator[key] = [].concat(accumulator[key], value);
        };

      case 'comma':
      case 'separator':
        return (key, value, accumulator) => {
          const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
          const isEncodedArray = typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };

      case 'bracket-separator':
        return (key, value, accumulator) => {
          const isArray = /(\[\])$/.test(key);
          key = key.replace(/\[\]$/, '');

          if (!isArray) {
            accumulator[key] = value ? decode(value, options) : value;
            return;
          }

          const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map(item => decode(item, options));

          if (accumulator[key] === undefined) {
            accumulator[key] = arrayValue;
            return;
          }

          accumulator[key] = [].concat(accumulator[key], arrayValue);
        };

      default:
        return (key, value, accumulator) => {
          if (accumulator[key] === undefined) {
            accumulator[key] = value;
            return;
          }

          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }

  function validateArrayFormatSeparator(value) {
    if (typeof value !== 'string' || value.length !== 1) {
      throw new TypeError('arrayFormatSeparator must be single character string');
    }
  }

  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode$1(value) : encodeURIComponent(value);
    }

    return value;
  }

  function decode(value, options) {
    if (options.decode) {
      return decodeComponent(value);
    }

    return value;
  }

  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }

    if (typeof input === 'object') {
      return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map(key => input[key]);
    }

    return input;
  }

  function removeHash(input) {
    const hashStart = input.indexOf('#');

    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }

    return input;
  }

  function getHash(url) {
    let hash = '';
    const hashStart = url.indexOf('#');

    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }

    return hash;
  }

  function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf('?');

    if (queryStart === -1) {
      return '';
    }

    return input.slice(queryStart + 1);
  }

  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
      value = value.toLowerCase() === 'true';
    }

    return value;
  }

  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ',',
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options); // Create an object with no prototype

    const ret = Object.create(null);

    if (typeof query !== 'string') {
      return ret;
    }

    query = query.trim().replace(/^[?#&]/, '');

    if (!query) {
      return ret;
    }

    for (const param of query.split('&')) {
      if (param === '') {
        continue;
      }

      let [key, value] = splitOnFirst$1(options.decode ? param.replace(/\+/g, ' ') : param, '='); // Missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

      value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
      formatter(decode(key, options), value, ret);
    }

    for (const key of Object.keys(ret)) {
      const value = ret[key];

      if (typeof value === 'object' && value !== null) {
        for (const k of Object.keys(value)) {
          value[k] = parseValue(value[k], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }

    if (options.sort === false) {
      return ret;
    }

    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
      const value = ret[key];

      if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
        // Sort object keys, not values
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }

      return result;
    }, Object.create(null));
  }

  exports.extract = extract;
  exports.parse = parse;

  exports.stringify = (object, options) => {
    if (!object) {
      return '';
    }

    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ','
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);

    const shouldFilter = key => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';

    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};

    for (const key of Object.keys(object)) {
      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }

    const keys = Object.keys(objectCopy);

    if (options.sort !== false) {
      keys.sort(options.sort);
    }

    return keys.map(key => {
      const value = object[key];

      if (value === undefined) {
        return '';
      }

      if (value === null) {
        return encode(key, options);
      }

      if (Array.isArray(value)) {
        if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
          return encode(key, options) + '[]';
        }

        return value.reduce(formatter(key), []).join('&');
      }

      return encode(key, options) + '=' + encode(value, options);
    }).filter(x => x.length > 0).join('&');
  };

  exports.parseUrl = (url, options) => {
    options = Object.assign({
      decode: true
    }, options);
    const [url_, hash] = splitOnFirst$1(url, '#');
    return Object.assign({
      url: url_.split('?')[0] || '',
      query: parse(extract(url), options)
    }, options && options.parseFragmentIdentifier && hash ? {
      fragmentIdentifier: decode(hash, options)
    } : {});
  };

  exports.stringifyUrl = (object, options) => {
    options = Object.assign({
      encode: true,
      strict: true,
      [encodeFragmentIdentifier]: true
    }, options);
    const url = removeHash(object.url).split('?')[0] || '';
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, {
      sort: false
    });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString = exports.stringify(query, options);

    if (queryString) {
      queryString = `?${queryString}`;
    }

    let hash = getHash(object.url);

    if (object.fragmentIdentifier) {
      hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
    }

    return `${url}${queryString}${hash}`;
  };

  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true,
      [encodeFragmentIdentifier]: false
    }, options);
    const {
      url,
      query,
      fragmentIdentifier
    } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
      url,
      query: filterObject(query, filter),
      fragmentIdentifier
    }, options);
  };

  exports.exclude = (input, filter, options) => {
    const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);
    return exports.pick(input, exclusionFilter, options);
  };
})(queryString);

var assign = Object.assign;

function throwIfCancellationRequested(config) {
  //
  if (config.cancelToken) {
    //
    config.cancelToken.throwIfRequested();
  }
} //


function combineURLs() {
  var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var relativeURL = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ''; //

  baseURL = baseURL || '';
  relativeURL = relativeURL || ''; //

  return relativeURL ? [baseURL.replace(/\/+$/, ''), relativeURL.replace(/^\/+/, '')].join('/') : baseURL;
}
/**
 * action:/{key}/xx
 * data:{key:'t'}
 * ->/t/xx
 * @param {*} url
 * @param {*} data
 */


function placeholderURLs(url, data, deleted) {
  //
  if (!url) {
    //
    return '';
  } //


  data = assign(data); //

  var reg = /\{([\w-]+)}/g;

  var fn1 = function fn1($0, $1) {
    var d = data[$1]; //
    // delete data[$1]; // remove url parameter
    //

    return d !== undefined ? d : '';
  };

  var fn2 = function fn2($0, $1) {
    var d = data[$1]; //

    delete data[$1]; // remove url parameter
    //

    return d !== undefined ? d : '';
  }; //


  var fn = deleted ? fn2 : fn1; //

  url = url.replace(reg, fn).replace(/(\w)\/{2,}/g, '$1/') // more than two //
  .replace(/\/$/, ''); // replace end /
  //

  return url;
} //


function dispatchRequest() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; //

  throwIfCancellationRequested(config); //

  var baseURL = config.baseURL,
      action = config.action,
      _config$data = config.data,
      data = _config$data === void 0 ? {} : _config$data,
      _config$body = config.body,
      body = _config$body === void 0 ? null : _config$body,
      _config$requestType = config.requestType,
      requestType = _config$requestType === void 0 ? 'json' : _config$requestType,
      _config$responseType = config.responseType,
      responseType = _config$responseType === void 0 ? 'json' : _config$responseType,
      dataSerialized = config.dataSerialized,
      dataSerializer = config.dataSerializer,
      _config$dataArrayForm = config.dataArrayFormat,
      dataArrayFormat = _config$dataArrayForm === void 0 ? 1 : _config$dataArrayForm,
      _config$dataPlacehold = config.dataPlaceholderRemoved,
      dataPlaceholderRemoved = _config$dataPlacehold === void 0 ? true : _config$dataPlacehold,
      _config$dataRequestEn = config.dataRequestEncode,
      dataRequestEncode = _config$dataRequestEn === void 0 ? 'rfc3986' : _config$dataRequestEn,
      _config$prefix = config.prefix,
      prefix = _config$prefix === void 0 ? '' : _config$prefix,
      timeout = config.timeout;
  var adapter = config.adapter || defaults.adapter; // body

  if (data && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
    //
    var dataType = Object.prototype.toString.call(data);

    if (!body && (dataType === '[object Object]' || dataType === '[object Array]')) {
      //
      if (requestType === 'json') {
        //
        config.headers = assign({
          'Content-Type': 'application/json;charset=UTF-8'
        }, config.headers); //

        config.body = JSON.stringify(data);
      } else if (requestType === 'form') {
        config.headers = assign({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }, config.headers); //

        config.body = queryString.stringify(data);
      }
    } else {
      //
      config.headers = assign(config.headers); //

      config.body = body || data;
    }
  } // url


  var prefixUrl = combineURLs(baseURL, prefix);
  var url = combineURLs(prefixUrl, action); //

  config.url = placeholderURLs(url, data, dataPlaceholderRemoved); //

  if (['delete', 'get', 'head', 'options'].includes(config.method)) {
    //
    config.url = buildURL(config.url, {
      params: data,
      dataArrayFormat: dataArrayFormat,
      dataSerializer: dataSerializer,
      dataRequestEncode: dataRequestEncode
    });
    config.body = null;
  } else if (dataSerialized || body) {
    // params serialized
    //
    config.url = buildURL(config.url, {
      params: data,
      dataArrayFormat: dataArrayFormat,
      dataSerializer: dataSerializer,
      dataRequestEncode: dataRequestEncode
    });
  } // auth


  if (config.auth) {
    //
    var username = config.auth.username || '';
    var password = config.auth.password || ''; //

    config.headers.Authorization = "Basic ".concat(btoa("".concat(username, ":").concat(password)));
  } //


  var races = [cancel2Throw(config), adapter(config)]; //

  if (timeout > 0) {
    //
    races.push(timeout2Throw(timeout, config));
  } //


  return Promise.race(races).then(function (res) {
    // {ok,data}
    if (!res.ok) {
      //
      return {
        res: res,
        req: config
      };
    } // already deal response data


    if (res.data !== undefined) {
      // already deal res and req
      if (res.res && res.req) {
        return res;
      } //


      return {
        data: res.data,
        res: res,
        req: config
      };
    } //


    try {
      //response no content
      if (res.statusText === 'No Content') {
        return {
          res: res,
          req: config
        };
      } //


      return res[responseType]().then(function (result) {
        //
        return {
          data: result,
          res: res,
          req: config
        };
      });
    } catch (e) {
      var response = {
        res: new ResponseError("response type ".concat(responseType, " not support, message ").concat(e.message())),
        req: config
      }; //

      return Promise.reject(response);
    }
  })["catch"](function (res) {
    //
    var response = {
      res: res,
      req: config
    }; //

    if (config.resolvedCatch) {
      return Promise.resolve(response);
    } //


    return Promise.reject(response);
  });
}

var isObject = utils.isObject,
    deepMerge = utils.deepMerge;

function mergeConfig() {
  var config1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; //

  var config = {}; //

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
  } //


  utils.forEach(config1, mergeDeepProperties);
  utils.forEach(config2, mergeDeepProperties); //

  return config;
}

function Request(instanceConfig) {
  //
  this.defaults = instanceConfig || {}; //

  this.interceptors = {
    request: new IterceptorManager(),
    response: new IterceptorManager()
  };
} //


Request.prototype.request = function (opts) {
  //
  var chain = [dispatchRequest, undefined]; //

  opts = mergeConfig(this.defaults, opts || {}); // method

  opts.method = opts.method || 'get';
  opts.method = opts.method.toLowerCase(); // headers

  opts.headers = opts.headers || {}; //

  var promise = Promise.resolve(opts); //

  this.interceptors.request.forEach(function (interceptor) {
    //
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  }); //

  this.interceptors.response.forEach(function (interceptor) {
    //
    chain.push(interceptor.fulfilled, interceptor.rejected);
  }); //

  while (chain.length) {
    //
    promise = promise.then(chain.shift(), chain.shift());
  } //


  return promise;
}; //


utils.forEach(['delete', 'get', 'head', 'options', 'post', 'put', 'patch'], function forEachMethod(method) {
  //
  Request.prototype[method] = function (action, data, options) {
    //
    if (_typeof$1(action) === 'object') {
      //
      options = utils.merge(action, {
        method: method
      }); //

      return this.request(options);
    } //


    options = utils.merge(options || {}, {
      method: method
    }); //

    return this.request(Object.assign({
      action: action,
      data: data
    }, options));
  };
});

function Cancel(message) {
  //
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  if (!this.message) {
    return 'Cancel';
  } //


  return ['Cancel:', this.message].join('');
};

Cancel.prototype.__CNACEL__ = true;

function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function');
  }

  var resolver = null;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolver = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      return;
    } //


    token.reason = new Cancel(message); //

    resolver(token.reason);
  });
} //


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  //
  if (this.reason) {
    //
    throw this.reason;
  }
}; //


CancelToken.source = function source() {
  var cancel; //

  var token = new CancelToken(function executor(c) {
    cancel = c;
  }); //

  return {
    token: token,
    cancel: cancel
  };
};

function createInstance(defaultConfig) {
  var context = new Request(defaultConfig);
  var instance = Request.prototype.request.bind(context); //

  utils.extend(instance, Request.prototype, context);
  utils.extend(instance, context); //

  instance.create = function (instanceConfig) {
    //
    if (typeof instanceConfig === 'function') {
      //
      var _request = createInstance(mergeConfig(instance.defaults, instanceConfig.defaults)); //


      _request.interceptors.request.handlers = [].concat(instanceConfig.interceptors.request.handlers || []); //

      _request.interceptors.response.handlers = [].concat(instanceConfig.interceptors.response.handlers || []); //

      return _request;
    }

    return createInstance(mergeConfig(instance.defaults, instanceConfig));
  }; //


  instance.Request = Request; // cancel

  instance.Cancel = Cancel;
  instance.CancelToken = CancelToken;
  return instance;
} //


var request$1 = createInstance(defaults); //

const request = request$1.create({
  adapter: Adapter
}); //

export default request;
export { Cancel, CancelToken, RequestError, ResponseError };
