// Custom API error class
export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError";
  }
}

// Async handler wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // as we are using promise here the async functn fn is properly awaited and if there is any error then we will pass that error to next middleware
};

export const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack); // log the error stack

  if (err instanceof APIError) {
    // check if the err is the instance of APIError
    res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  } else if (err.name === "validationError") {
    return res.status(400).json({
      status: "Error",
      message: "validation error",
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occured",
    });
  }
};
