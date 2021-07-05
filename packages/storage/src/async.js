export default storage => {
  if (!storage) {
    return {};
  }
  //
  const methods = Object.keys(storage);
  const base = {};
  methods.forEach(method => {
    //
    base[method] = function(...args) {
      //
      return Promise.resolve(storage[method].apply(null, args));
    };
  });

  return base;
};
