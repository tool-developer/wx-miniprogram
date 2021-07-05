export class RequestError extends Error {
  constructor(text, request) {
    super(text);
    this.ok = false;
    this.name = 'RequestError';
    this.request = request;
  }
}

export default RequestError;
