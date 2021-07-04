import md5 from './index';
//
test('md5 value test:',()=>{
    //
    expect(md5("value")).toEqual("2063c1608d6e0baf80249c42e2be5804");
});