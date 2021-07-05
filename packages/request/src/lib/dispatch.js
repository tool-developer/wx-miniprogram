import { stringify } from 'query-string';

import defaults from './defaults';
import buildUrl from './buildUrl';
import { ResponseError } from './ResponseError';
import { cancel2Throw, timeout2Throw } from '../lib/utils';

const { assign } = Object;

function throwIfCancellationRequested(config) {
  //
  if (config.cancelToken) {
    //
    config.cancelToken.throwIfRequested();
  }
}

//
function combineURLs(baseURL = '', relativeURL = '') {
  //
  baseURL = baseURL || '';
  relativeURL = relativeURL || '';
  //
  return relativeURL
    ? [baseURL.replace(/\/+$/, ''), relativeURL.replace(/^\/+/, '')].join('/')
    : baseURL;
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
  }
  //
  data = assign(data);
  //
  const reg = /\{([\w-]+)}/g;
  const fn1 = function($0, $1) {
    const d = data[$1];
    //
    // delete data[$1]; // remove url parameter
    //
    return d !== undefined ? d : '';
  };
  const fn2 = function($0, $1) {
    const d = data[$1];
    //
    delete data[$1]; // remove url parameter
    //
    return d !== undefined ? d : '';
  };
  //
  const fn = deleted ? fn2 : fn1;
  //
  url = url
    .replace(reg, fn)
    .replace(/(\w)\/{2,}/g, '$1/') // more than two //
    .replace(/\/$/, ''); // replace end /
  //
  return url;
}
//
export default function dispatchRequest(config = {}) {
  //
  throwIfCancellationRequested(config);
  //
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
    timeout,
  } = config;
  const adapter = config.adapter || defaults.adapter;

  // body
  if (data && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
    //
    const dataType = Object.prototype.toString.call(data);
    if (!body && (dataType === '[object Object]' || dataType === '[object Array]')) {
      //
      if (requestType === 'json') {
        //
        config.headers = assign(
          {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          config.headers,
        );
        //
        config.body = JSON.stringify(data);
      } else if (requestType === 'form') {
        config.headers = assign(
          {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          config.headers,
        );

        //
        config.body = stringify(data);
      }
    } else {
      //
      config.headers = assign(config.headers);
      //
      config.body = body || data;
    }
  }

  // url
  const prefixUrl = combineURLs(baseURL, prefix);
  const url = combineURLs(prefixUrl, action);
  //
  config.url = placeholderURLs(url, data, dataPlaceholderRemoved);
  //
  if (['delete', 'get', 'head', 'options'].includes(config.method)) {
    //
    config.url = buildUrl(config.url,{
      params:data, 
      dataArrayFormat, 
      dataSerializer,
      dataRequestEncode
    });
    config.body = null;
  } else if (dataSerialized || body) {
    // params serialized
    //
    config.url = buildUrl(config.url,{
      params:data, 
      dataArrayFormat, 
      dataSerializer,
      dataRequestEncode
    });
  }
  // auth
  if (config.auth) {
    //
    const username = config.auth.username || '';
    const password = config.auth.password || '';
    //
    config.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  }

  //
  const races = [cancel2Throw(config), adapter(config)];
  //
  if (timeout > 0) {
    //
    races.push(timeout2Throw(timeout, config));
  }
  //
  return Promise.race(races)
    .then(
      res => {
        // {ok,data}
        if (!res.ok) {
          //
          return { res, req: config };
        }
        // already deal response data
        if(res.data !== undefined){
          // already deal res and req
          if(res.res && res.req){

            return res;
          }
          //
          return { data:res.data,res,req:config};
        }
        //
        try {
          //response no content
          if(res.statusText === 'No Content'){

            return {
              res,
              req:config
            }
          }
          //
          return res[responseType]().then(result => {
            //
            return {
              data: result,
              res,
              req: config,
            };
          });
        } catch (e) {
          const response = {
            res: new ResponseError(
              `response type ${responseType} not support, message ${e.message()}`,
            ),
            req: config,
          };
          //
          return Promise.reject(response);
        }
      }
    )
    .catch(res => {
      //
      const response = { res, req: config };
      //
      if(config.resolvedCatch){

        return Promise.resolve(response);
      }
      //
      return Promise.reject(response);
    });
}
