export default function bind(fn, thisArg) {
  //
  return function wrap(...args) {
    // let args = Array.prototype.slice.call(arguments);
    /* let args = new Array(arguments.length);
    for (let i = 0; i < args.length; i++) {
        args[i] = arguments[i];
    } */
    //
    return fn.apply(thisArg, args);
  };
}
