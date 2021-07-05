import utils from './utils';

export default function buildURL(url,options) {
  const {params, dataArrayFormat, dataSerializer,dataRequestEncode} = options || {};
  if (!params) {
    return url;
  }

  // URL RFC3986
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
    if(!dataRequestEncode){
      //
      return val;
    }
    //
    if(dataRequestEncode === 'encodeURIComponent'){
      //
      return encodeURIComponent(val);
    }
    if(typeof dataRequestEncode === 'function'){
      //
      return dataRequestEncode(val);
    }
    //
    if (utils.isArray(val)) {
      //
      return val;
    }
    //
    return encodeURIComponent(val)
      // .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }

  let serializedParams = null;
  if (dataSerializer) {
    //
    serializedParams = dataSerializer(params);
  } else {
    //
    const parts = [];
    //
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
      });
      // key=1,2,3
      if (dataArrayFormat === 3 && arr3.length > 0) {
        //
        parts.push(`${encode(key)}=${arr3.join(',')}`);
      }
    });
    //
    serializedParams = parts.join('&');
  }

  //
  if (serializedParams) {
    //
    const hashmarkIndex = url.indexOf('#');
    //
    if (hashmarkIndex !== -1) {
      //
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  //
  return url;
}
