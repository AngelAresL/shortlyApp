export interface CustomError extends Error {
    httpStatus?: number;
  }