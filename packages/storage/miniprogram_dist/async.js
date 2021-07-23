var async = function (storage) {
  if (!storage) {
    return {};
  } //


  var methods = Object.keys(storage);
  var base = {};
  methods.forEach(function (method) {
    //
    base[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      } //


      return Promise.resolve(storage[method].apply(null, args));
    };
  });
  return base;
};

export default async;
