 class AlphaError extends Error {
    constructor(error, request) {
        super()
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this)
          }
        this.name = 'AlphaError';
        this.message = error;
        this.request = {
          method: request.method,
          status: request.status
        }
    }
}
module.exports = AlphaError