import request from './index';

const timeout = 10000;
// 设置超时
jest.setTimeout(20000);
//
describe('@tool-developer request test', () => {
  const wxr = request.create({
    baseURL: 'http://baidu.com',
    headers: {
      token: 'oh-my-token',
    },
    timeout,
  });
  //
  wxr.interceptors.request.use(config => {
    // console.log('interceptors.request config', config);

    return config;
  });
  //
  wxr.interceptors.response.use(res => {
    // console.log('interceptors.response res', res);

    return res;
  });

  it('404 not found,ok true', async () => {
    //
    return await wxr
      .request({
        baseURL: 'https://baidu.com',
        action: '/api/test',
        method: 'get',
        data: {
          a: 'a',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data, res }) => {
        //
        // console.log('wxr request result', data, res);
      });
  });

  it('404 not found,ok false', async () => {
    
    return await wxr
      .get(
        '/api/test/get',
        {
          a: 'a',
        },
        {
          baseURL: 'https://baidu.com',
        },
      )
      .then(({ data, res }) => {
        // console.log('wxr request get result', data, res);
      });
  });

  it('request timeout,catch error', async () => {
    //
    return await wxr
      .post({
        action: '/api/test/post',
        data: {
          a: 'a',
        },
      })
      .then(({ data }) => {
        // console.log('wxr request post result', data);
      });
  });
});

describe('@tool-developer github request test', () => {
  const wxr = request.create({
    baseURL: 'https://api.github.com',
    timeout,
  });
  //
  it('request get success', async () => {
    //
    return await wxr
      .get({
        action: '/users/github',
        timeout: 20000,
      })
      .then(({ data }) => {
        // console.log('request get success data', data);
      });
  });
});
//
describe('@tool-developer httpbin.org request test', () => {
  const wxr = request.create({
    baseURL: 'https://httpbin.org',
    timeout
  });
  //
  it('request post success', async () => {
    //
    return await wxr
      .post({
        action: '/post',
        data: {
          a: 1,
        },
      })
      .then(({ data }) => {
        // console.log('request post success data', data);
      });
  });
});

describe('@tool-developer request options merge', () => {
  const wxr = request.create({
    baseURL: 'https://httpbin.org',
    timeout
  });

  const data = { a: 1, b: null, c: { d: '', e: null, f: undefined } };
  //
  it('request post success', async () => {
    //
    wxr.interceptors.request.use(config => {
      //
      // console.log('request options merge interceptors.request config', config);

      expect(config.data).toEqual(data);

      return config;
    });
    //
    wxr.interceptors.response.use(response => {
      //
      const { req } = response;
      // console.log('request options merge interceptors.reponse req', req);

      expect(req.url).toEqual('https://httpbin.org/post?a=1&c=%7B%22d%22:%22%22,%22e%22:null%7D');

      return response;
    });

    return await wxr
      .post({
        action: '/post',
        data: data,
        body: {
          a: 1,
          b: null,
          c: {
            d: '',
            e: null,
            f: undefined,
          },
        },
        serialized: true,
      })
      .then(({ data }) => {
        //console.log('request post success data', data);
      });
  });
});

describe('@tool-developer request encode', () => {
  //
  const data = { a: 1, b: null, c:'[]{}' };
  //
  it('request dataRequestEncode false ', async () => {
    //
    const wxr = request.create({
      baseURL: 'https://httpbin.org',
      timeout,
      dataRequestEncode:false
    });
    //
    wxr.interceptors.response.use(response => {
      //
      const {req:config} = response;
      //
      // console.log('request dataRequestEncode false', config.url);

      expect(config.url).toEqual('https://httpbin.org/get?a=1&c=[]{}');
      //
      return response;
    });
    //
    return await wxr
      .get({
        action: '/get',
        data: data
      })
      .then(({ data }) => {
        //console.log('request post success data', data);
      });
  });
  it('request dataRequestEncode encodeURIComponent ', async () => {
    //
    const wxr = request.create({
      baseURL: 'https://httpbin.org',
      timeout,
      dataRequestEncode:'encodeURIComponent'
    });
    wxr.interceptors.response.use(response => {
      //
      const {req:config} = response;
      //
      // console.log('request dataRequestEncode encodeURIComponent', config.url);

      expect(config.url).toEqual('https://httpbin.org/get?a=1&c=%5B%5D%7B%7D');
      //
      return response;
    });
    //
    return await wxr
      .get({
        action: '/get',
        data: data
      })
      .then(({ data }) => {
        //console.log('request post success data', data);
      });
  });
  it('request dataRequestEncode function ', async () => {
    //
    const wxr = request.create({
      baseURL: 'https://httpbin.org',
      timeout,
      dataRequestEncode:function(val){
  
        return val;
      }
    });
    wxr.interceptors.response.use(response => {
      //
      const {req:config} = response;
      //
      // console.log('request dataRequestEncode function', config.url);

      expect(config.url).toEqual('https://httpbin.org/get?a=1&c=[]{}');
      //
      return response;
    });
    //
    return await wxr
      .get({
        action: '/get',
        data: data
      })
      .then(({ data }) => {
        //console.log('request post success data', data);
      });
  });
  it('request dataRequestEncode default rfc3986 ', async () => {
    //
    const wxr = request.create({
      baseURL: 'https://httpbin.org',
      timeout
    });
    wxr.interceptors.response.use(response => {
      //
      const {req:config} = response;
      //
      //console.log('request dataRequestEncode default rfc3986', config.url);

      expect(config.url).toEqual('https://httpbin.org/get?a=1&c=[]%7B%7D');
      //
      return response;
    });
    //
    return await wxr
      .get({
        action: '/get',
        data: data
      })
      .then(({ data }) => {
        //console.log('request post success data', data);
      });
  });
});
