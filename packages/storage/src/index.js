import Storage from '@tool-developer/wo-base-storage/dist';
//
const w = global.wx || wx || {};
//
const storage = new Storage({
  setItem:w.setStorageSync,
  getItem:w.getStorageSync,
  removeItem:w.removeStorageSync,
  clear:w.clearStorageSync
});

export default storage;
