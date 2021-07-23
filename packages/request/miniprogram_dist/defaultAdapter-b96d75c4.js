function Adapter(config) {
  return new Promise(function (resolve, reject) {
    var data = config.data;
    var headers = config.headers || {};
    var url = config.url;
    var method = config.method || 'get'; //

    method = method.toUpperCase(); // console.log('--wx adapter config--',config);

    var success = function success(res) {
      //开启微信Audits检测时需要assign处理
      //let res = Object.assign({},res);
      var data = res.data; //

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
        data: data,
        //服务端真实数据
        res: res,
        //微信响应
        ok: res.statusCode === 200,
        status: data.status || data.code,
        // 服务端响应状态
        statusCode: res.statusCode // 微信端响应status code
        //req:config

      });
    }; //


    var fail = function fail(err) {
      //
      reject({
        res: {
          err: err
        },
        err: err
      });
    }; //


    var task = wx.request({
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

export { Adapter as A };
