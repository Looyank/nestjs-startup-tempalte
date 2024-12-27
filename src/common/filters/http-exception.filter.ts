import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse: any = exception.getResponse();
    console.log('exceptionResponse', exceptionResponse);
    let validatorMessage = exceptionResponse;
    if (typeof validatorMessage === 'object') {
      validatorMessage = exceptionResponse.message[0];
    }
    response.status(status).json({
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      message: validatorMessage || exception.message,
    });
  }
}
