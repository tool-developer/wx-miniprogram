import storage from './session';
// 清空
storage.clear();
//
// 设置超时
jest.setTimeout(20000);
//
describe('storage local session storage auto test:', () => {
  //
  it('base test', () => {
    //
    storage.set('session-k1', 'k1');
    let k1 = storage.get('session-k1');
    expect(k1).toEqual('k1');
    //
    storage.remove('session-k1');
    k1 = storage.get('session-k1');
    expect(k1).toEqual(undefined);
    //
    storage.set('session-k2', 'k2');
    storage.set('session-k3', 'k3');
    let k2 = storage.get('session-k2');
    let k3 = storage.get('session-k3');
    expect(k2).toEqual('k2');
    expect(k3).toEqual('k3');

    //
    storage.clear();
    k2 = storage.get('session-k2');
    k3 = storage.get('session-k3');
    expect(k2).toEqual(undefined);
    expect(k3).toEqual(undefined);

    //
    let v4 = { a: 'a', b: { c: 'c' } };
    storage.set('session-k4', v4);
    let k4 = storage.get('session-k4');
    expect(k4).toEqual(k4);
  });

  it('after expired 10', done => {
    //
    let v5 = { a: 'a', b: { c: 'c' } };
    storage.set('session-k5', v5, 10);
    //
    let t = setTimeout(() => {
      //
      let k5 = storage.get('session-k5');
      //
      expect(k5).toEqual(undefined);
      //
      done();
      //
      clearTimeout(t);
    }, 12);
  });
});
