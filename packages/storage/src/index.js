import Storage from './lib/index';
//
const wx = global.wx || wx || {};
//
const storage = new Storage({
  setItem:wx.setStorageSync,
  getItem:wx.getStorageSync,
  removeItem:wx.removeStorageSync,
  clear:wx.clearStorageSync
});

export default storage;
