export default function Cancel(message) {
  //
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  if (!this.message) {
    return 'Cancel';
  }
  //
  return ['Cancel:', this.message].join('');
};

Cancel.prototype.__CNACEL__ = true;
