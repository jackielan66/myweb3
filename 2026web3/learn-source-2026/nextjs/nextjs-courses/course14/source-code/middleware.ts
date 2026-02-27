import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// https://next-intl.dev/docs/routing/middleware
// 中间件配置，用于处理国际化路由
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
