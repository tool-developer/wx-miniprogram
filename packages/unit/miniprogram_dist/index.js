import wx from './fn.js';

/**
 * 该方案来自于
 * https://github.com/zhengguorong/maizuo_wechat
 * 后续会完善Page相关，结合基础架构
 */
const noop = () => {};
const isFn = fn => typeof fn === 'function';
let wId = 0;

global.Page = options => {
  const {
    data,
    ...rest
  } = options || {};
  const page = {
    data,
    setData: jest.fn(function (newData, cb) {
      this.data = { ...this.data,
        ...newData
      };
      cb && cb();
    }),
    onLoad: noop,
    onReady: noop,
    onUnLoad: noop,
    __wxWebviewId__: wId++,
    ...rest
  };
  global.wxPageInstance = page; //

  return page;
}; //


global.getApp = function () {
  //
  return {
    data: {},
    events: {},
    globalData: {}
  };
}; //


global.wx = wx;

export { isFn, noop };
