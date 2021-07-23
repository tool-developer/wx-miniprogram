// default expired time
var defaultExpireTime = 3600000; // 60*60*1000,1hour
//

function Storage(storage) {
  //
  function tryCatchParse(data) {
    //
    if (typeof data !== 'string') {
      //
      return data;
    } //


    try {
      //
      data = JSON.parse(data);
    } catch (e) {
      data = {};
    } //


    return data;
  } //


  function toReturn(data, callback) {
    //
    if (callback && typeof callback === 'function') {
      //
      callback(null, data);
    } //


    return data;
  }

  function beforeSet(k, v, e, cb) {
    //
    if (typeof e === 'function') {
      cb = e;
      e = defaultExpireTime; // 60*60*1000,1小时
    } //


    e = parseInt(e, 10) || defaultExpireTime; //

    var data = {
      data: v
    }; // e = -1 为永久缓存

    if (e !== -1) {
      // 使用Date.now在jest 27可能会有bug
      data.expired = Date.now() + e;
    } //


    try {
      //
      data = JSON.stringify(data);
    } catch (ex) {
      //
      return console.log('set storage data json format error', ex);
    } //


    return {
      k: k,
      data: data,
      e: e,
      cb: cb
    };
  }

  function afterGet(data, remove) {
    if (!data) {
      //
      return undefined;
    } //


    data = tryCatchParse(data) || {}; //

    var _data = data,
        expired = _data.expired; // 永久缓存

    if (!expired) {
      //
      return data.data;
    }

    expired = parseInt(expired, 10); // 已过期

    if (Date.now() > expired) {
      // 清除缓存
      if (remove && typeof remove === 'function') {
        //
        remove();
      } //


      return undefined;
    } //


    return data.data;
  } //


  var base = {
    get: function get(k, cb) {
      //
      if (k === undefined || k === null) {
        //
        return toReturn(undefined, cb);
      } //


      var res = storage.getItem(k); //

      var data = afterGet(res, function () {
        //
        base.remove(k);
      }); //

      return toReturn(data, cb);
    },
    set: function set(k, v, e, cb) {
      //
      var r = beforeSet(k, v, e, cb);
      var data = r.data; //

      k = r.k;
      cb = r.cb;

      if (k === undefined || k === null) {
        //
        return toReturn(undefined, cb);
      } //


      return toReturn(storage.setItem(k, data), cb);
    },
    remove: function remove(k, cb) {
      //
      if (k === undefined || k === null) {
        //
        return toReturn(undefined, cb);
      } //


      return toReturn(storage.removeItem(k), cb);
    },
    clear: function clear(cb) {
      //
      return toReturn(storage.clear(), cb);
    }
  }; //

  return base;
}

export { Storage as S };
