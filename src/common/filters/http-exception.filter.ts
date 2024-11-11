import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorRespons = {};

        if(exception instanceof HttpException) {
            // If it's an HttpException, we can extract additional information
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if(typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }else if(typeof exceptionResponse === 'object') {
                errorRespons = exceptionResponse;
                message = (exceptionResponse as any).message || message;
            }
        }else{
            // Handle non-HTTP exceptions (e.g., runtime errors)
            console.error('Unhandled exception', exception);
        }
         // Send the error response in a consistent format
        response.status(status).json({
            statusCode: status,
            message,
            path: request.url,
            timeStamp: new Date().toISOString(),
            error: errorRespons,
        })
    }
}