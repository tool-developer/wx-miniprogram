import utils from './utils';

//
function IterceptorManager() {
  //
  this.handlers = [];
}
//
IterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected,
  });

  return this.handlers.length - 1;
};
//
IterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
IterceptorManager.prototype.forEach = function forEach(fn) {
  //
  utils.forEach(this.handlers, h => {
    if (h !== null) {
      fn(h);
    }
  });
};

export default IterceptorManager;
