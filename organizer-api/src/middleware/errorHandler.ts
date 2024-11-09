import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { sendBadRequestResponse, sendErrorResponse, sendValidationError } from '../utils/responsesHandler';

export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction): any => {
  if (error instanceof z.ZodError) {
    const errors = error.errors.map((e: any) => e.message) as string[];
    return sendValidationError(response, 'Validation Error', errors);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const res =
      process.env.ENV == 'development'
        ? { error: 'Prisma Error occurred', details: error }
        : { error: 'Error occurred' };

    return sendBadRequestResponse(response, res);
  }

  // Handle other types of errors
  const res = process.env.ENV == 'development' ? { message: error.message } : { message: 'Internal Server Error' };
  return sendErrorResponse(response, res);
};