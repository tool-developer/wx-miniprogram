import unit from '@tool-developer/wx-unit';

// 模拟request方法
global.wx.request = ({success})=>success({data:{},status:'ok'});

export default unit;