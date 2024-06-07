import StatusCodes from "http-status-codes";

class UnAuthenticatedError extends Error {
  statusCode: number;
  constructor(message:any) {
    super(message);
    this.name = "UnAuthenticatedError";
    this.message = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export default UnAuthenticatedError;
