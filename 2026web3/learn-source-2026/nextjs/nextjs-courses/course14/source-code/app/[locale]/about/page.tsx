import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Navigation'});

  return (
    <main style={{padding: 24}}>
      <h1 style={{fontSize: 28}}>{t('about')}</h1>
      <p style={{marginTop: 12}}>This is a simple about page.</p>
    </main>
  );
}
