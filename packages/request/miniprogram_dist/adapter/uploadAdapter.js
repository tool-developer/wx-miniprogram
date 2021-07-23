//文件上传适配器
function uploadAdapter(config) {
  //
  return new Promise(function (resolve, reject) {
    var data = config.data;
    var headers = config.headers || {};
    var url = config.url; //console.log('--wx adapter config--',config);

    var success = function success(res) {
      var data = res.data; //

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          /* Ignore */
        }
      }

      resolve(data);
    };

    var fail = function fail(err) {
      reject(err);
    }; //


    var formData = data.formData || '';
    var name = data.name || '';
    var filePath = data.filePath || ''; //

    if (!name) {
      //
      return fail('no name');
    } //


    if (!filePath) {
      //
      return fail('no file path');
    } //


    var task = wx.uploadFile({
      // ...config,
      url: url,
      filePath: filePath,
      name: name,
      formData: formData,
      header: headers,
      success: success,
      fail: fail
    });
    return task;
  });
}

export default uploadAdapter;
