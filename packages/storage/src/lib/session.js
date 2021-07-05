//
function SessionStorage() {}

// 数据缓存
SessionStorage.Caches = {};

SessionStorage.prototype.setItem = function(key, data) {
  //
  SessionStorage.Caches[key] = data;
};
SessionStorage.prototype.getItem = function(key) {
  //
  return SessionStorage.Caches[key];
};
SessionStorage.prototype.removeItem = function(key) {
  //
  delete SessionStorage.Caches[key];
};
SessionStorage.prototype.clear = function() {
  //
  SessionStorage.Caches = {};
};

function getSessionStore() {
  try {
    return window.sessionStorage;
  } catch (e) {
    return new SessionStorage();
  }
}

export default getSessionStore();
