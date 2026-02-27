import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from './routing';

export const locales = routing.locales;

// https://next-intl.dev/docs/getting-started/app-router#using-requestconfig
// 配置 Next.js 国际化请求
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
