import unit from '@tool-developer/wx-unit';

import session from './session';

// 使用session模拟
global.wx.setStorageSync = session.setItem;
global.wx.getStorageSync = session.getItem;
global.wx.removeStorageSync = session.removeItem;
global.wx.clearStorageSync = session.clear;

export default unit;