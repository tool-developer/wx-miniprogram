import utils from './index';
//
test('@tool-developer utils test', () => {
  //
  expect(utils).toMatchSnapshot();
  //
  expect(utils.isEmpty([])).toBe(true);
  //
  expect(utils.isEmpty({})).toBe(true);
  //
  expect(utils.isArray(['1', '2'])).toBe(true);
  //
  expect(utils.isObject({})).toBe(true);
  //
  expect(utils.isDate(new Date())).toBe(true);

  let a1 = {
    a: 'a',
  };
  let b1 = {
    b: 'b',
  };
  let c1 = {
    c: 'c',
  };
  //
  expect(utils.merge(a1, b1, c1)).toEqual({
    a: 'a',
    b: 'b',
    c: 'c',
  });

  let a2 = {
    a: {
      a: 'a',
    },
  };
  let b2 = {
    b: {
      b: 'b',
    },
  };
  let c2 = {
    b: {
      c: 'c',
    },
  };
  //
  expect(utils.merge(a2, b2, c2)).toEqual({
    a: {
      a: 'a',
    },
    b: {
      b: 'b',
      c: 'c',
    },
  });

  function mergeConfig(config1 = {}, config2 = {}) {
    const config = {};

    //
    function mergeDeepProperties(val, prop) {
      //
      if (utils.isObject(config2[prop])) {
        //
        config[prop] = utils.deepMerge(config1[prop], config2[prop]);
      } else if (typeof config2[prop] !== 'undefined') {
        //
        config[prop] = config2[prop];
      } else if (utils.isObject(config1[prop])) {
        //
        config[prop] = utils.deepMerge(config1[prop]);
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

  let deepArrayObjectOne = {
    timeout: 10000,
    headers: { Accept: 'application/json' },
    method: 'get',
    requestType: 'json',
    responseType: 'json',
    baseURL: 'http://192.168.1.91:9000',
    maxCache: 100,
    credentials: 'include',
    mode: 'cors',
  };
  let deepArrayObjectTwo = {
    action: '/a/b/c',
    data: {
      projectId: 1,
      freight: 20,
      groupIds: [],
      imageUrls: [
        '//a/b/c',
      ],
      productDesc: '',
      productLabel: '',
      productName: '1',
      productTitle: '1',
      productType: 1,
      remark: '',
      shareImageUrl: '',
      shareName: '1',
      shipmentType: 2,
      videoUrl: '',
      saleRule: {},
      productId: 79,
    },
    method: 'POST',
    serialized: true,
    key: null,
  };

  let res = mergeConfig(deepArrayObjectOne, deepArrayObjectTwo);
  expect(utils.isArray(res.data.imageUrls)).toEqual(true);
});
