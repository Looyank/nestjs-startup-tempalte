// import {
//   CallHandler,
//   ExecutionContext,
//   HttpException,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { catchError } from 'rxjs/operators';

// @Injectable()
// export class ErrorsInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler) {
//     return next.handle().pipe(
//       catchError((error) => {
//         if (error instanceof HttpException) {
//           return Promise.resolve({
//             code: error.getStatus(),
//             message: error.getResponse().toString(),
//           });
//         }
//         return Promise.resolve({
//           code: 500,
//           message: error.toString(),
//         });
//       }),
//     );
//   }
// }
