import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { LoginService } from '../service/login.service';

@Injectable()
export class AccessTokenInterceptor implements NestInterceptor {
  constructor(private readonly loginService: LoginService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return this.loginService
      .execute(request, response)
      .then(() => next.handle());
  }
}
