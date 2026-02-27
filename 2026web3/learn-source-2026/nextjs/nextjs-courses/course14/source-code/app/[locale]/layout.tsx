import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import type {ReactNode} from 'react';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      <body>
        {/* 提供 NextIntlClientProvider 组件，用于在客户端渲染时提供国际化支持 */}
        {/* https://next-intl.dev/docs/getting-started/app-router#using-nextintlclientprovider */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
