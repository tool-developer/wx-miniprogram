import { S as Storage } from './index-73aeb906.js';

const wx = global.wx || wx || {}; //

const storage = new Storage({
  setItem: wx.setStorageSync,
  getItem: wx.getStorageSync,
  removeItem: wx.removeStorageSync,
  clear: wx.clearStorageSync
});

export default storage;
