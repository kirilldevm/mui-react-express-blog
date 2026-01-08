// import { Request, Response, NextFunction } from 'express';

// export interface AppError extends Error {
//   status?: number;
// }

// export const errorHandler = (
//   err: AppError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.error(err);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal Server Error',
//   });
// };

import { NextFunction, Request, Response } from 'express';
import { HttpException } from './errors';

export function errorsHandlingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpException) {
    return res.status(err.status).json(err);
  }

  console.error('Error occurred:', err);
  return res
    .status(500)
    .json({ message: 'Internal Server Error', status: 500, errors: [] });
}
