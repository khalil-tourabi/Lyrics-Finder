import StatusCodes from "http-status-codes";

class NotFoundError extends Error {
  statusCode: number;
  constructor(message:any) {
    super(message);
    this.name = "NotFoundError";
    this.message = message;
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export default NotFoundError;