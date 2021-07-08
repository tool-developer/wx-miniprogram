import app from './index';

test('wx app test', () => {
  // 固定index.test.js.snap中该字段时间
  app.__SET_DATA_FREQUENCY_TIMESTAMP = 1625559145942;
  //
  expect(app).toMatchSnapshot();
});