import StatusCodes from "http-status-codes";

class BadRequestError extends Error {
  statusCode: number;
  constructor(message:any) {
    super(message);
    this.name = "BadRequestError";
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export default BadRequestError;