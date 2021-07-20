import behaviors from './behaviors';

test('wx app behaviors test', () => {
  //
  global.Behavior = behavior=>behavior;
  // 固定index.test.js.snap中该字段时间
  behaviors.methods.__SET_DATA_FREQUENCY_TIMESTAMP = 1625559145942;
  //
  expect(behaviors).toMatchSnapshot();
});