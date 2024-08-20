// class expressError extends Error {
//   constructor(status, message) {
//     super();
//     this.statusCode = status;
//     this.message = message;
//   }
// }

// module.exports =  expressError;

class ExpressError extends Error {
  constructor(status, message) {
      super();
      this.status = status;
      this.message = message;
  }
}
module.exports = ExpressError;