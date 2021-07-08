/**
 * wx app.js
 */
//
const objectAssign = Object.assign;
//data,events,i18n需要单独处理，只处理一层数据，所以建议尽量使用一层数据
const assign = function(){
  let args = Array.prototype.slice.call(arguments);
  let data = {};
  let events = {};
  let i18n = {};
  //
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const d = arg.data || {};
    const e = arg.events || {};
    const f = arg.i18n || {};
    //
    data = objectAssign(data, d);
    events = objectAssign(events, e);
    i18n = objectAssign(i18n, f);
  }
  //
  args = args.concat({ data, events, i18n });
  //
  return objectAssign.apply(null, args);
}
//
function trycatchstringify(data) {
  //
  if (typeof data === 'object') {
    try {
      //
      data = JSON.stringify(data);
    } catch (e) {
      //
      data = '';
    }
  }
  //
  return data;
}
//
let wxapp = {
  //
  version: '1.0.0',
  events: {},
  data: {},
  // 导航列表配置
  TabBarList:[],//
  // 页面名字路径KV映射 
  PageNamePathKV:{
    'webview':'pages/webview/index'
  },
  extend:function(...args){
    // 第一项置空
    args = [{}].concat(args);
    //
    return assign.apply(null,args);
  }
}
//
wxapp.SET_DATA_FREQUENCY = 100;
wxapp.__SET_DATA_FREQUENCY_TIMESTAMP = Date.now();
wxapp.__SET_DATA_CACHE = {};
/**
* 跳转相关
*/
function handlePageTo() {
  const obj = {};
  //
  ['navigateTo', 'switchTab', 'redirectTo', 'reLaunch'].forEach(function (type) {
    //
    obj[type] = function (options, cb) {
      //直接走原有API
      if (typeof options === 'object') {
        //
        return wx[type](options)
      }
      //
      const opts = {
        url: options,
        success: function (e) {
          //console.log('success',e);
          cb && cb(null, e);
        },
        fail: function (e) {
          //console.log('fail',e);
          cb && cb(e);
        }
      };
      //
      return wx[type](opts);
    }
  })

  //switchTab->switchTo
  obj['switchTo'] = obj['switchTab'];
  obj['reLaunchTo'] = obj['reLaunch'];

  //整合为pageTo方法
  obj['pageTo'] = function (url, type, cb) {
    //
    if (typeof type === 'function') {
      //
      cb = type;
      type = '';
    }
    //
    const method = this[type + 'To'] || this['navigateTo'];
    //
    return method && method.call(this, url, cb);
  }
  //
  return obj;
}

//
function obj2url(obj) {
  if (!obj) return "";
  const res = [];
  //
  for (let i in obj) {
    //
    if (obj[i] !== undefined && obj[i] !== null) {
      //
      res.push(i + "=" + encodeURIComponent(obj[i]));
    }
  }
  //
  return res.join("&");
}

//
function pageTo(path, query, type, cb) {
  //
  path = path.replace(/^\//, "");
  //
  if (path.indexOf("?") > -1) {
    //
    query = query ? "&" + obj2url(query) : "";
  } else {
    //
    query = query ? "?" + obj2url(query) : "";
  }
  //
  if (type === "reLaunch" || type === true) {
    //
    return wxapp.reLaunchTo(["/", path, query].join(""), cb);
  }
  //如果是tab，进入指定页
  if (wxapp.TabBarList.indexOf(path) > -1) {
    //tab需要使用switchTab，且不能传递参数
    return wxapp.switchTab(["/", path].join(""));
  }
  //
  const currentPage = wxapp.getWxCurrentPage();
  if (currentPage === path) {
    //
    return console.log("current page is path", currentPage);
  }
  //
  return wxapp.pageTo(["/", path, query].join(""), type, cb);
}
//
assign(wxapp, handlePageTo(),{
  //
  go(page,query,type,cb){
    if(!page){
      //
      return console.log('no page path')
    }
    const path = wxapp.PageNamePathKV[page] || page;
    // 进入网页
    if(/^http/.test(path)){
      query = query || {};
      query.to = path;
      //
      return this.go("webview",query,type,cb);
    }
    //
    return pageTo(path,query,type,cb);
  },
  // 返回
  back(delta = -1){
    wx.navigateBack({
      delta,
    });

  }
})

/**
 * 多语言处理
 */
function placeholder(str, data) {
  data = data || {};
  //
  if (!str) {
    //
    return '';
  }
  //
  const reg = /\{([\w-\.]+)}/g;
  const fn = function ($0, $1) {
    const d = data[$1];
    //
    return d !== undefined ? d : '';
  }
  //
  return str.replace(reg, fn)
}
//
assign(wxapp, {
  i18n: {},
  //
  i18nHandle(prop, data) {
    const message = this.i18n[prop];
    //
    return placeholder(message, data);
  }
})

/**
* 数据处理相关
*/
assign(wxapp, {
  /**
  * 获取dataset数据
  * @param {*} key
  * @param {*} e
  */
  dataset(key, e) {
    if (e === undefined && typeof key === 'object') {
      //
      return key.currentTarget.dataset || {};
    }
    if (!e) {

      console.error('no e target');
    }
    //
    const dataset = (e && e.currentTarget.dataset) || {};
    //
    return dataset[key];
  },
  /**
  * 改写this.setData方法
  * 1.限制调用频率
  * 2.处理undefined数据，只处理第一层
  */
  $set(data, callback) {
    //undefined 处理
    Object.keys(data).forEach(function (key) {

      data[key] = void 0 === data[key] ? '' : data[key];
    });
    //
    const now = Date.now();
    //删除定时任务
    if (wxapp.__SET_DATA_TIMEOUT) {
      //
      clearTimeout(wxapp.__SET_DATA_TIMEOUT);
    }
    //频率处理
    if (now - wxapp.__SET_DATA_FREQUENCY_TIMESTAMP < wxapp.SET_DATA_FREQUENCY) {
      //
      wxapp.__SET_DATA_CACHE = assign(wxapp.__SET_DATA_CACHE || {}, data);
      //定时任务
      return wxapp.__SET_DATA_TIMEOUT = setTimeout(() => {
        //
        this.$set(data, callback);
        //
        clearTimeout(wxapp.__SET_DATA_TIMEOUT);
      }, wxapp.SET_DATA_FREQUENCY);
    }
    //
    wxapp.__SET_DATA_FREQUENCY_TIMESTAMP = now;
    //
    data = assign({}, wxapp.__SET_DATA_CACHE || {}, data);
    //
    wxapp.__SET_DATA_CACHE = null;
    //
    this.setData(data, function () {
      //
      callback && callback();
    });
  }
})

/**
* 事件相关
*/
assign(wxapp, {
  /**
  * 统一事件处理
  */
  bindEvent(e) {
    // 存在bindEvents，所有时间之前调用
    if (typeof this.bindEvents == 'function') {
      //
      return this.bindEvents(e, _next.bind(this))
    }
    //
    _next.call(this);
    //
    function _next() {
      //
      const type = e.type;
      const currentTarget = e.currentTarget;
      const id = currentTarget.dataset.eventid || currentTarget.dataset.id || currentTarget.id;
      //console.log('id:',id);
      if (!id) {

        return;
      }
      //
      const events = this.events || {};
      let method = events[type + ' #' + id];
      //
      if (typeof method === 'string') {
        //
        method = this[method];
      }
      //
      if (typeof method === 'function') {
        //
        return method.call(this, e);
      }
    }
  },
  //拨打电话
  bindTelEvent(e) {
    let tel = this.dataset('tel', e);
    if (!tel) {

      return;
    }
    //
    const notAllowed = this.dataset('notAllowed', e);
    //拨打权限处理
    if (notAllowed) {
      //
      const method = this['bindTelNotAllow'];
      if (method) {
        //
        return method.call(this, tel, e);
      }
      const message = typeof notAllowed === 'string' ? notAllowed : '不能电话联系';
      //
      return this.showToast(message, 'error');
    }
    //
    if (tel) {
      //
      const callback = this.dataset('callback', e);
      const method = this[callback || 'bindTelEventCallback'];
      method && method.call(this, tel, e);
      //
      //this.fromTelShowed = true;
      //
      return wx.makePhoneCall({
        phoneNumber: tel
      }).catch(()=>{
        //
      })
    }
  }
})

/**
* 微信设置相关
*/
assign(wxapp, {
  i18n:{
    'authorize.title':'授权提示',
    'authorize.content':'{appName}需要您授权{scopeName}，点击确定前去设置',
    'authorize.loading':'正在授权...',
    'authorize.cancel':'取消授权',
    'authorize.success':'已授权'
  },
  /**
 * 获取微信设置
 * @param callback
 * @returns {*}
 */
  getWxSetting: function (callback) {
    //
    return wx.getSetting({
      success: function (res) {
        const authSetting = res.authSetting || {};
        //console.log('wx auth setting:',authSetting);
        //
        return callback(null, authSetting);
      },
      fail: function () {
        //
        return callback(null, {});
      }
    });
  },
  /**
  * 微信授权
  * @param {*} scope
  * @param {*} callback
  * 
  */
  authorize: function (options, callback) {
    //
    wxapp.getWxSetting((err, settings) => {
      //
      const scope = options.scope || options.value;
      if (settings[scope]) {
        //已授权
        return callback && callback(null, scope);
      }
      //未授权
      const scopeName = options.scopeName;
      const appName = options.appName || '';
      //
      wx.authorize({
        scope,
        //用户取消授权进入
        fail: () => {
          //
          wxapp.showModal({
            title: this.i18nHandle('authorize.title'),
            content: this.i18nHandle('authorize.content',{appName,scopeName}),
            showCancel: true,
            success: (res) => {
              //
              if (res.confirm) {
                //
                wx.openSetting();
                //
                return callback && callback(scope, this.i18nHandle('authorize.loading'));
              }
              //
              return callback && callback(scope, this.i18nHandle('authorize.cancel'));
            }
          });
        },
        //用户重新授权进入
        success: () => {
          //
          callback && callback(null, this.i18nHandle('authorize.success'));
        }
      });
    });
  },
  /**
  * 微信是否授权
  * @param {*} callback
  */
  getWxUserInfoAuthorize: function (callback) {
    //
    return wxapp.getWxSetting(function (err, settings) {
      //已授权用户登录
      if (settings['scope.userInfo']) {
        //
        return callback(null, true);
      }
      //
      return callback(null, false);
    });
  },
})
//全局modal，控制同时只显示一个modal
let modalObj = null;
let isShowLoading = false;
//消息提示相关
assign(wxapp, {
  /**
  * 隐藏loading
  */
  hideLoading: function () {
    //
    if (isShowLoading) {
      //
      wx.hideLoading();
      //
      isShowLoading = false;
    }
  },
  /**
  * loading提示
  * @param {*} options
  * @param {*} mask
  */
  showLoading: function (options, mask) {
    options = options || {};
    //
    if (typeof options === 'string') {
      //
      options = {
        title: options
      }
    }
    //
    options['mask'] = mask || options['mask'];
    //
    wx.showLoading(options);
    //
    isShowLoading = true;
  },
  /**
  * toast提示
  * @param {*} options
  * @param {*} icon
  * @param {*} duration
  */
  showToast: function (options, icon, duration) {
    options = options || {};
    icon = icon || '';
    let image = '';
    //
    if (typeof options === 'string') {
      //
      options = {
        title: options
      }
    }
    //
    if (!options['title']) {

      return;
    }
    //
    const errorIcon = this.i18n['toast.icon.error'];
    if (icon === 'error' && errorIcon) {
      image = errorIcon;
    }
    //
    if (image) {
      //
      options['image'] = image;
    } else {
      //
      options['icon'] = icon || options['icon'] || 'none';
    }
    //
    options['duration'] = duration || options['duration'] || 1500;
    //
    if (isShowLoading) {
      //
      wx.hideLoading();
      isShowLoading = false;
    }
    //
    return wx.showToast(options);
  },
  //隐藏toast
  hideToast: function () {
    //
    wx.hideToast();
  },
  /**
  * 显示Modal
  * 由于不能主动关闭modal，暂时不考虑优先级，只显示最先到达的一个
  * 主要是防止多个接口同时返回错误，出现modal提示太多
  * @param {*} options
  * @param {*} title
  */
  showModal: function (options, title) {
    options = options || {};
    //
    if (typeof options === 'string') {
      //
      options = {
        content: options
      }
    }
    //
    if (!options.forced && modalObj) {

      return console.log('only one modal');
    }
    //
    let content = options.content;
    //
    if (typeof content === 'object') {
      //
      content = trycatchstringify(content);
    }
    //
    if (!content) {

      return;
    }
    //暂时不对强制弹出modal做处理
    modalObj = true;
    //
    options['content'] = content;
    options['title'] = title || options['title'] || '';
    //
    const complete = options['complete'];
    //
    options.complete = function (res) {
      //关闭后
      modalObj = null;
      //
      complete && complete(res);
    }
    //
    wx.showModal(options);
  },
});

//其他
assign(wxapp, {
  //获取当前页面options
  getWxCurrentOptions: function () {
    const pages = getCurrentPages();
    if (pages.length) {
      const current = pages[pages.length - 1] || {};
      const options = current['options'] || {};
      //
      return options;
    }
    //
    return {};
  },
  //获取当前页面路由地址
  getWxCurrentPage: function () {
    const pages = getCurrentPages();
    if (pages.length) {
      const current = pages[pages.length - 1] || {};
      const currentPage = current['route'];
      //
      return currentPage;
    }
    //
    return '';
  }
})

export default wxapp;