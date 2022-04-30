#### nest

> 之前使用的 node 服务框架基本都是 express,koa. 最近在研究企业级框架,更适合团队多人开发的框架,整体用下来的感受是 太约束了, 没有使用 express 和 koa 的放纵了, 但是也正是因为约束性,才利于多人开发,在加上 typescript 的加持,开发起来还是很方便的.

##### 一.基本概念--控制器

> 控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hi')
  getHello(): string {
    return this.appService.getHello();
  }
}
```

##### 二.基本概念--提供者

> Providers 是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为 provider - service, repository, factory, helper 等等。 他们都可以通过 constructor 注入依赖关系。 这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest 运行时系统。 Provider 只是一个用 @Injectable() 装饰器注释的类。

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

##### 三.基本概念--模块

> 模块是具有 @Module() 装饰器的类。 @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构。

```ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './commen/middleware/logger.middleware';

import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(), LoginModule, RegisterModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 绑定中间间
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
```

##### 四.中间件

> 中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 next() 中间件函数。 next() 中间件函数通常由名为 next 的变量表示。

cors 中间件

```ts
import { Request, Response } from 'express';

export function cors(req: Request, res: Response, next: () => void) {
  const origin = req.get('Origin');

  // 判断是不是来自跨域的请求
  if (origin !== undefined) {
    res.set({
      'Access-Control-Allow-Origin': origin,
    });
    // 判断是不是预检请求
    if (req.method === 'OPTIONS') {
      res.set({
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
        // eslint-disable-next-line prettier/prettier
        'Access-Control-Allow-Headers': 'Content-Type, account, password, Authorization',
      });
      res.status(204).end();
      return;
    }
  }
  next();
}
```

日志中间件

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.path, '我是日志中间件');
    next();
  }
}
```

##### 五.异常过滤器

> 内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。

自定义异常

```ts
import { UnauthorizedException, HttpStatus } from '@nestjs/common';
// 自定义异常过滤器
export class MyUnauthorizedException extends UnauthorizedException {
  constructor() {
    super(
      {
        error: '密码错误',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED as any
    );
  }
}
```

异常过滤器

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(1111);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

##### 六.管道

> 管道是具有 @Injectable() 装饰器的类。管道应实现 PipeTransform 接口。

管道[官网地址](https://docs.nestjs.cn/8/pipes)

##### 七.守卫

> 守卫是一个使用 @Injectable() 装饰器的类。 守卫应该实现 CanActivate 接口。

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import jwt from '../utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) return false;
    const token = authorization.replace('Bearer ', '');

    const res = jwt.verify(token);
    if (res) return true;
    return false;
  }
}
```

##### 八.拦截器

> 拦截器是使用 @Injectable() 装饰器注解的类。拦截器应该实现 NestInterceptor 接口。

拦截器[官网地址](https://docs.nestjs.cn/8/interceptors)
