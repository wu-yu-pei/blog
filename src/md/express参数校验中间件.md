# 技术学习- node 参数校验中间件封装
> 对node案例中的参数校验进行封装思路：
使用封装为中间件 在router层进行检验 这样controller层的代码就非常的干净import
```js
{ Router } from 'express';

import newsController from './news.controller';
import verifyPipe from '../../pipe/verify.pipe';
import { ParamsPosition } from '../../common/enum';

const newRoute = Router();

// 尝试一下 封装参数检验
// 但是 目前只能校验 参数是否必填 和 是否是指定类型，且只能通过中间件的方式来检验
// 写起来 router层 不是很 干净 看着有些 厚重、重复
// TODO 尝试把 参数检验 抽取到 controller层 并且保证controller层 代码的整洁
// TODO 参考@hapi/joi （借助装饰器语法）

newRoute.post('/news', verifyPipe.required(['title', 'type', 'content'], ParamsPosition.BODY), verifyPipe.required(['files'], ParamsPosition.REQ), newsController.createNews);

newRoute.get('/news', verifyPipe.optionalMustNumber(['page', 'pageSize'], ParamsPosition.QUERY), newsController.getNews);

newRoute.get('/news/:id', verifyPipe.mustNumber(['id'], ParamsPosition.PARAMS), newsController.getNewsDetail);

newRoute.put('/news', verifyPipe.required(['id', 'title', 'type', 'content'], ParamsPosition.BODY), verifyPipe.mustNumber(['id'], ParamsPosition.BODY), newsController.updateNews);

newRoute.delete('/news/:id', verifyPipe.mustNumber(['id'], ParamsPosition.PARAMS), newsController.deleteNews);

export default newRoute;
```

# 检验中间件
- 基类
```js
import { NextFunction } from 'express';
import { BadRequest } from '../../errors';

export default class BasePipe {
  constructor() {}

  required(paramsList, paramsPosition) {}

  mustNumber(paramsList, paramsPosition) {}

  optionalMustNumber(paramsList, paramsPosition) {}

  verifyResultMessage(message: string[], next: NextFunction) {
    if (message.length !== 0) {
      throw new BadRequest(JSON.stringify(message));
    } else {
      next();
    }
  }
}
```
- 子类 的校验方法 返回一个中间件
```js
import { NextFunction, Request, Response } from 'express';
import { isNumber } from '../common/utils/index';
import { ParamsPosition } from '../common/enum';
import BasePipe from '../common/base/baseVerify.pipe';

class VerifyParamsPipe extends BasePipe {
  // 参数校验 必填参数
  required(paramsList: string[], paramsPosition = ParamsPosition.BODY) {
    return (req: Request, res: Response, next: NextFunction) => {
      const message = [];

      for (let i = 0; i < paramsList.length; i++) {
        if (paramsPosition === ParamsPosition.REQ) {
          if (!req[paramsList[i]]) {
            message.push(`${paramsList[i]} 参数不能为空`);
          }
        } else {
          if (!req[paramsPosition][paramsList[i]]) {
            message.push(`${paramsList[i]} 参数不能为空`);
          }
        }
      }

      this.verifyResultMessage(message, next);
    };
  }

  // 参数检验 是否为数字
  mustNumber(paramsList: string[], paramsPosition = ParamsPosition.BODY) {
    return (req: Request, res: Response, next: NextFunction) => {
      const message = [];
      for (let i = 0; i < paramsList.length; i++) {
        if (paramsPosition === ParamsPosition.REQ) {
          if (!isNumber(req[paramsList[i]])) {
            message.push(`${paramsList[i]} 应该为数字`);
          }
        } else {
          if (!isNumber(req[paramsPosition][paramsList[i]])) {
            message.push(`${paramsList[i]} 应该为数字`);
          }
        }
      }

      this.verifyResultMessage(message, next);
    };
  }

  // 可选类型参数校验
  optionalMustNumber(paramsList: string[], paramsPosition = ParamsPosition.BODY) {
    return (req: Request, res: Response, next: NextFunction) => {
      const message = [];
      for (let i = 0; i < paramsList.length; i++) {
        if (paramsPosition === ParamsPosition.REQ) {
          if (req[paramsList[i]] && !isNumber(req[paramsList[i]])) {
            message.push(`${paramsList[i]} 应该为数字`);
          }
        } else {
          if (req[paramsPosition][paramsList[i]] && !isNumber(req[paramsPosition][paramsList[i]])) {
            message.push(`${paramsList[i]} 应该为数字`);
          }
        }
      }

      this.verifyResultMessage(message, next);
    };
  }
}

export default new VerifyParamsPipe();
```
# 总结

相对简单的检验 自己封装还是没问题的 但是对于复杂一点的参数检验 此中间件就显得非常乏力
而且 router层 会有非常笨重的代码 来进行参数校验。
# 下一步封装思路
-  尝试把 参数检验 抽取到 controller层 并且保证controller层 代码的整洁
-  参考@hapi/joi （借助装饰器语法）

# 关于 AI
在浏览一个 我关注的技术博主的博客中 看到了博主对ai的一些研究，还挺有趣。本地搭建AI开发环境 生成图片。我自己也试了试 但是环境没有部署成功（应该是电脑的问题）
相关文章：
https://antfu.me/posts/ai-qrcode
https://antfu.me/posts/ai-qrcode-refine
非常有意思。 接下来我也会继续研究 跟着博主一起学习ai。