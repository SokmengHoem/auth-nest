// src/common/interceptors/response.interceptor.ts

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { GlobalResponse } from '../interfaces/response.interface';
import { PaginatedResponse } from '../interfaces/paginated.interface';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, GlobalResponse<T> | PaginatedResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<GlobalResponse<T> | PaginatedResponse<T>> {
      return next.handle().pipe(
        map((response: any) => {
          const statusCode = context.switchToHttp().getResponse().statusCode;
  
          // Check if the response contains `data` and `message` properties
          const data = response?.data ?? response;
          const message = response?.message ?? 'Request successful';
          const meta = response?.meta;

          if(meta){
            //Handle paginated response
            return {
              statusCode,
              message,
              data,
              meta,
            } as PaginatedResponse<T>;
          } 
  
          //handle regular response
          return {
            statusCode,
            message,
            data,
          } as GlobalResponse<T>;
        }),
      );
    }
  }
  