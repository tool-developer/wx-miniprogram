//文件上传适配器
export default function uploadAdapter(config) {
  //
  return new Promise(function (resolve, reject) {
      let data = config.data;
      let headers = config.headers||{};
      let url = config.url;

      //console.log('--wx adapter config--',config);

      let success = function (res) {
          let data = res.data;
          //
          if (typeof data === 'string') {
              try {
                  data = JSON.parse(data);
              } catch (e) { /* Ignore */ }
          }

          resolve(data);
      }
      let fail = function (err) {

          reject(err);
      }
      //
      let formData = data.formData||'';
      let name = data.name||'';
      let filePath = data.filePath||'';
      //
      if (!name) {
          //
          return fail('no name');
      }
      //
      if (!filePath) {
          //
          return fail('no file path');
      }

      //
      let task = wx.uploadFile({
          // ...config,
          url: url,
          filePath: filePath,
          name: name,
          formData: formData,
          header:headers,
          success: success,
          fail: fail
      });

      return task;
  })
}