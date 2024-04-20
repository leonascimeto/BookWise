import { ZodError } from 'zod';

export interface HttpResponse<T> {
  status: number;
  body?: T;
}

export function formatErrorResponse(error: any): HttpResponse<any> {
  if (error instanceof ZodError) {
    console.log(error.flatten());
    return {
      status: 422,
      body: { message: 'validation error', errors: error.flatten() },
    };
  }
  console.log(error);
  if (!error?.message) return { status: 500, body: { message: 'Internal server error' } };
  return { status: 400, body: { message: error.message } };
}
