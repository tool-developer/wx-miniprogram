function Adapter(config) {
  return new Promise(function (resolve, reject) {
    const data = config.data;
    const headers = config.headers || {};
    const url = config.url;
    let method = config.method || 'get'; //

    method = method.toUpperCase(); // console.log('--wx adapter config--',config);

    const success = function (res) {
      //开启微信Audits检测时需要assign处理
      //let res = Object.assign({},res);
      let data = res.data; //

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          /* Ignore */
        }
      } //


      res.data = data;
      data = data || {}; //

      resolve({
        data,
        //服务端真实数据
        res,
        //微信响应
        ok: res.statusCode === 200,
        status: data.status || data.code,
        // 服务端响应状态
        statusCode: res.statusCode // 微信端响应status code
        //req:config

      });
    }; //


    const fail = function (err) {
      //
      reject({
        res: {
          err
        },
        err
      });
    }; //


    const task = wx.request({
      // ...config,
      url: url,
      header: headers,
      data: data,
      method: method,
      success: success,
      fail: fail
    });
    return task;
  });
}

var defaults = {
  adapter: Adapter,
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

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

const {
  toString
} = Object.prototype;

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


  const keys = Object.keys(obj);

  if (keys.length) {
    return false;
  }

  return true;
}

function isObject$1(val) {
  return val !== null && typeof val === 'object';
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
    for (let i = 0, l = obj.length; i < l; i += 1) {
      //
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i]; //

      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

function merge(...args) {
  //
  const result = {}; //

  function assignValue(val, key) {
    if (isObject$1(result[key]) && isObject$1(val)) {
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
  } //


  return result;
}

function deepMerge$1(...args) {
  //
  const result = isArray(args[0]) ? [] : {}; //

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


  for (let i = 0, l = args.length; i < l; i += 1) {
    //
    forEach(args[i], assignValue);
  } //


  return result;
}

var index = {
  forEach,
  merge,
  deepMerge: deepMerge$1,
  isArray,
  isObject: isObject$1,
  isDate,
  isEmpty
};

var miniprogram_dist = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index,
  deepMerge: deepMerge$1,
  forEach: forEach,
  isArray: isArray,
  isDate: isDate,
  isEmpty: isEmpty,
  isObject: isObject$1,
  merge: merge
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(miniprogram_dist);

var utils$1 = require$$0;

class RequestError extends Error {
  constructor(text, request) {
    super(text);
    this.ok = false;
    this.name = 'RequestError';
    this.request = request;
  }

}

function extend(a, b, thisArg) {
  //
  utils$1.forEach(b, (val, key) => {
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
  return new Promise((_, reject) => {
    const t = setTimeout(() => {
      reject(new RequestError(`timeout of ${ms}ms exceeded`, request));
      clearTimeout(t);
    }, ms);
  });
} //

function cancel2Throw({
  cancelToken
}) {
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
var utils = Object.assign(utils$1, {
  extend
});

function IterceptorManager() {
  //
  this.handlers = [];
} //


IterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
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
  utils.forEach(this.handlers, h => {
    if (h !== null) {
      fn(h);
    }
  });
};

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
        return key => (result, value) => {
          if (value === null || value === undefined || value.length === 0) {
            return result;
          }

          if (result.length === 0) {
            return [[encode(key, options), '=', encode(value, options)].join('')];
          }

          return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
        };

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

      value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
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
      strict: true
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
      hash = `#${encode(object.fragmentIdentifier, options)}`;
    }

    return `${url}${queryString}${hash}`;
  };

  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true
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

function buildURL(url, options) {
  const {
    params,
    dataArrayFormat,
    dataSerializer,
    dataRequestEncode
  } = options || {};

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

  let serializedParams = null;

  if (dataSerializer) {
    //
    serializedParams = dataSerializer(params);
  } else {
    //
    const parts = []; //

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

      const arr3 = [];
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
          parts.push(`${encode(key)}=${encode(v)}`);
        }
      }); // key=1,2,3

      if (dataArrayFormat === 3 && arr3.length > 0) {
        //
        parts.push(`${encode(key)}=${arr3.join(',')}`);
      }
    }); //

    serializedParams = parts.join('&');
  } //


  if (serializedParams) {
    //
    const hashmarkIndex = url.indexOf('#'); //

    if (hashmarkIndex !== -1) {
      //
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  } //


  return url;
}

class ResponseError extends Error {
  constructor(response, text, data, request) {
    super(text || response.statusText);
    this.ok = false;
    this.name = 'ResponseError';
    this.data = data;
    this.response = response;
    this.request = request;
  }

}

const {
  assign
} = Object;

function throwIfCancellationRequested(config) {
  //
  if (config.cancelToken) {
    //
    config.cancelToken.throwIfRequested();
  }
} //


function combineURLs(baseURL = '', relativeURL = '') {
  //
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

  const reg = /\{([\w-]+)}/g;

  const fn1 = function ($0, $1) {
    const d = data[$1]; //
    // delete data[$1]; // remove url parameter
    //

    return d !== undefined ? d : '';
  };

  const fn2 = function ($0, $1) {
    const d = data[$1]; //

    delete data[$1]; // remove url parameter
    //

    return d !== undefined ? d : '';
  }; //


  const fn = deleted ? fn2 : fn1; //

  url = url.replace(reg, fn).replace(/(\w)\/{2,}/g, '$1/') // more than two //
  .replace(/\/$/, ''); // replace end /
  //

  return url;
} //


function dispatchRequest(config = {}) {
  //
  throwIfCancellationRequested(config); //

  const {
    baseURL,
    action,
    data = {},
    body = null,
    requestType = 'json',
    responseType = 'json',
    dataSerialized,
    dataSerializer,
    dataArrayFormat = 1,
    dataPlaceholderRemoved = true,
    dataRequestEncode = 'rfc3986',
    prefix = '',
    timeout
  } = config;
  const adapter = config.adapter || defaults.adapter; // body

  if (data && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
    //
    const dataType = Object.prototype.toString.call(data);

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


  const prefixUrl = combineURLs(baseURL, prefix);
  const url = combineURLs(prefixUrl, action); //

  config.url = placeholderURLs(url, data, dataPlaceholderRemoved); //

  if (['delete', 'get', 'head', 'options'].includes(config.method)) {
    //
    config.url = buildURL(config.url, {
      params: data,
      dataArrayFormat,
      dataSerializer,
      dataRequestEncode
    });
    config.body = null;
  } else if (dataSerialized || body) {
    // params serialized
    //
    config.url = buildURL(config.url, {
      params: data,
      dataArrayFormat,
      dataSerializer,
      dataRequestEncode
    });
  } // auth


  if (config.auth) {
    //
    const username = config.auth.username || '';
    const password = config.auth.password || ''; //

    config.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  } //


  const races = [cancel2Throw(config), adapter(config)]; //

  if (timeout > 0) {
    //
    races.push(timeout2Throw(timeout, config));
  } //


  return Promise.race(races).then(res => {
    // {ok,data}
    if (!res.ok) {
      //
      return {
        res,
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
        res,
        req: config
      };
    } //


    try {
      //response no content
      if (res.statusText === 'No Content') {
        return {
          res,
          req: config
        };
      } //


      return res[responseType]().then(result => {
        //
        return {
          data: result,
          res,
          req: config
        };
      });
    } catch (e) {
      const response = {
        res: new ResponseError(`response type ${responseType} not support, message ${e.message()}`),
        req: config
      }; //

      return Promise.reject(response);
    }
  }).catch(res => {
    //
    const response = {
      res,
      req: config
    }; //

    if (config.resolvedCatch) {
      return Promise.resolve(response);
    } //


    return Promise.reject(response);
  });
}

const {
  isObject,
  deepMerge
} = utils;
function mergeConfig(config1 = {}, config2 = {}) {
  //
  const config = {}; //

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

/**
 * Request Object
 * see https://github.com/axios/axios
 *
 */

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
  const chain = [dispatchRequest, undefined]; //

  opts = mergeConfig(this.defaults, opts || {}); // method

  opts.method = opts.method || 'get';
  opts.method = opts.method.toLowerCase(); // headers

  opts.headers = opts.headers || {}; //

  let promise = Promise.resolve(opts); //

  this.interceptors.request.forEach(interceptor => {
    //
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  }); //

  this.interceptors.response.forEach(interceptor => {
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
    if (typeof action === 'object') {
      //
      options = utils.merge(action, {
        method
      }); //

      return this.request(options);
    } //


    options = utils.merge(options || {}, {
      method
    }); //

    return this.request(Object.assign({
      action,
      data
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

  let resolver = null;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolver = resolve;
  });
  const token = this;
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
  let cancel; //

  const token = new CancelToken(function executor(c) {
    cancel = c;
  }); //

  return {
    token,
    cancel
  };
};

function createInstance(defaultConfig) {
  const context = new Request(defaultConfig);
  const instance = Request.prototype.request.bind(context); //

  utils.extend(instance, Request.prototype, context);
  utils.extend(instance, context); //

  instance.create = function (instanceConfig) {
    //
    if (typeof instanceConfig === 'function') {
      //
      const request = createInstance(mergeConfig(instance.defaults, instanceConfig.defaults)); //

      request.interceptors.request.handlers = [].concat(instanceConfig.interceptors.request.handlers || []); //

      request.interceptors.response.handlers = [].concat(instanceConfig.interceptors.response.handlers || []); //

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
}; // cancel


request.Cancel = Cancel;
request.CancelToken = CancelToken;

export default request;
export { Cancel, CancelToken, RequestError, ResponseError };
