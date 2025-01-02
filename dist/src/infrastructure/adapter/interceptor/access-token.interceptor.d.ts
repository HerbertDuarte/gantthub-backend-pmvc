import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
export declare class AccessTokenInterceptor implements NestInterceptor {
    private readonly loginService;
    constructor(loginService: LoginService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
