import Request from '@tool-developer/wo-base-request';
import adapter from './adapter/defaultAdapter';
//
const request = Request.create({
  adapter
});
//
export * from '@tool-developer/wo-base-request';
//
export default request;
