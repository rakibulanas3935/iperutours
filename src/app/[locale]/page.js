import {useTranslations} from 'next-intl';
export default function Home() {
  const t=useTranslations("HomePage")
  return (
     <div className="text-7xl text-center">{t('title')}</div>
  );
}
