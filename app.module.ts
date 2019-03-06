import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from "./src/config/config";

import { UserModule } from './src/modules/users/user.module';
import { AuthModule } from './src/modules/auth/auth.module';
import { ActivityLogModule } from './src/modules/activity-logs/activity-log.module';
import { LoggerMiddleware } from './src/common/middlewares/loggere.middleware';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: config.dbHost,
            port: config.dbPort,
            username: config.dbUserName,
            password: config.dbPassword,
            database: config.dbName,
            entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        AuthModule,
        UserModule,
        ActivityLogModule
    ],
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .with('AppModule')
            .forRoutes('users')
    }
} 