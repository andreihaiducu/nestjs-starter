import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(param: string): MiddlewareFunction {
        return (req, res, next) => {
            console.log(`[${param}] Incoming request`);
            next();
        };
    }
}