'use client';

import {useTranslations} from 'next-intl';
import {Link} from '../i18n/navigation';

export default function NavBar() {
  const t = useTranslations('Navigation');

  return (
    <nav style={{display: 'flex', gap: 12}}>
      <Link href="/">{t('home')}</Link>
      <Link href="/about">{t('about')}</Link>
    </nav>
  );
}