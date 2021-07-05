import adapter from '../adapter/defaultAdapter';
//
export default {
  adapter,
  timeout: 3000,
  headers: {
    Accept: 'application/json',
  },
  method: 'get',
  requestType: 'json',
  responseType: 'json',
  dataArrayFormat: 1, // 1:key=1&key=2&key=3; 2:key[]=1&key[]=2&key[]=3; 3:key=1,2,3;
  prefix: '', // url = baseURL + prefix + action
  dataPlaceholderRemoved: false, // remove url placeholder data parameter
  resolvedCatch:false,// when exception to enter catch
  dataRequestEncode:'rfc3986',// request url encode
};
