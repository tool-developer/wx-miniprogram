import session from './session';
import async from './async';

const storage = async(session);
// 清空
storage.clear();
//
// 设置超时
jest.setTimeout(20000);
//
describe('storage local async session storage auto test:', () => {

  //
  it('base test', done => {

    const t = async ()=>{
      //
      await storage.set('async-k1', 'k1');
      let k1 = await storage.get('async-k1');
      expect(k1).toEqual('k1');
      //
      await storage.remove('async-k1');
      k1 = await storage.get('async-k1');
      expect(k1).toEqual(undefined);
      //
      await storage.set('async-k2', 'k2');
      await storage.set('async-k3', 'k3');
      let k2 = await storage.get('async-k2');
      let k3 = await storage.get('async-k3');
      expect(k2).toEqual('k2');
      expect(k3).toEqual('k3');

      //
      await storage.clear();
      k2 = await storage.get('async-k2');
      k3 = await storage.get('async-k3');
      expect(k2).toEqual(undefined);
      expect(k3).toEqual(undefined);

      //
      let v4 = { a: 'a', b: { c: 'c' } };
      await storage.set('async-k4', v4);
      let k4 = storage.get('async-k4');
      expect(k4).toEqual(k4);
    }
    //
    t();
    //
    done();
  });

  it('after expired 10', done => {
    let v5 = { a: 'a', b: { c: 'c' } };
    storage.set('async-k5', v5, 10);
    //
    let t = setTimeout(async () => {
      //
      let k5 = await storage.get('async-k5');
      expect(k5).toEqual(undefined);
      //
      done();
      //
      clearTimeout(t);
    }, 12);
  });
});
