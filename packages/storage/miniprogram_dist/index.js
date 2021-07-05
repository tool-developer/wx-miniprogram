import { S as Storage } from './index-73aeb906.js';

const w = global.wx || wx || {}; //

const storage = new Storage({
  setItem: w.setStorageSync,
  getItem: w.getStorageSync,
  removeItem: w.removeStorageSync,
  clear: w.clearStorageSync
});

export default storage;
