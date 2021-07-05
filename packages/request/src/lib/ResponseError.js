export class ResponseError extends Error {
  constructor(response, text, data, request) {
    super(text || response.statusText);
    this.ok = false;
    this.name = 'ResponseError';
    this.data = data;
    this.response = response;
    this.request = request;
  }
}

export default ResponseError;
