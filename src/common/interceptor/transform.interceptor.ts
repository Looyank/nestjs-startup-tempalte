import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
  data: T;
  code: number;
  message: string;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((result: any) => {
        if (result && typeof result === 'object' && 'message' in result) {
          return {
            data: result?.data || null,
            code: 200,
            message: result.message,
          };
        }
        return {
          data: result,
          code: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
