import touchevent from './touchevent';

test('wx app touchevent test', () => {
  
  // 固定index.test.js.snap中该字段时间
  //
  expect(touchevent).toMatchSnapshot();
});