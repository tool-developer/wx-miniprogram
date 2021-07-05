// default expired time
const defaultExpireTime = 3600000; // 60*60*1000,1hour

//
function Storage(storage) {
  //
  function tryCatchParse(data) {
    //
    if (typeof data !== 'string') {
      //
      return data;
    }
    //
    try {
      //
      data = JSON.parse(data);
    } catch (e) {
      data = {};
    }
    //
    return data;
  }
  //
  function toReturn(data, callback) {
    //
    if (callback && typeof callback === 'function') {
      //
      callback(null,data);
    }
    //
    return data;
  }

  function beforeSet(k, v, e, cb) {
    //
    if (typeof e === 'function') {
      cb = e;
      e = defaultExpireTime; // 60*60*1000,1小时
    }
    //
    e = parseInt(e, 10) || defaultExpireTime;
    //
    let data = {
      data: v,
    };
    // e = -1 为永久缓存
    if (e !== -1) {
      // 使用Date.now在jest 27可能会有bug
      data.expired = Date.now() + e;
    }
    //
    try {
      //
      data = JSON.stringify(data);
    } catch (ex) {
      //
      return console.log('set storage data json format error', ex);
    }
    //
    return {
      k,
      data,
      e,
      cb,
    };
  }

  function afterGet(data, remove) {
    if (!data) {
      //
      return undefined;
    }
    //
    data = tryCatchParse(data) || {};
    //
    let { expired } = data;
    // 永久缓存
    if (!expired) {
      //
      return data.data;
    }
    expired = parseInt(expired, 10);
    // 已过期
    if (Date.now() > expired) {
      // 清除缓存
      if (remove && typeof remove === 'function') {
        //
        remove();
      }
      //
      return undefined;
    }
    //
    return data.data;
  }
  //
  const base = {
    get(k, cb) {
      //
      if (k === undefined || k === null) {
        //
        return toReturn(undefined, cb);
      }
      //
      const res = storage.getItem(k);
      //
      const data = afterGet(res, function() {
        //
        base.remove(k);
      });
      //
      return toReturn(data, cb);
    },
    set(k, v, e, cb) {
      //
      const r = beforeSet(k, v, e, cb);
      const { data } = r;
      //
      k = r.k;
      cb = r.cb;

      if (k === undefined || k === null) {
        //
        return toReturn(undefined, cb);
      }
      //
      return toReturn(storage.setItem(k, data), cb);
    },
    remove(k, cb) {
      //
      if (k === undefined || k === null) {
        //
        return toReturn(undefined, cb);
      }
      //
      return toReturn(storage.removeItem(k), cb);
    },
    clear(cb) {
      //
      return toReturn(storage.clear(), cb);
    },
  };
  //
  return base;
}

export default Storage;
