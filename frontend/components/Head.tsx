import NextHead from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import config from '../lib/config';
import { MetaProps } from '../lib/types/layout';

const siteTitle = 'Crypto Memes - Fun for Dev';
const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();
  const meta: MetaProps = {
    title: siteTitle,
    description: 'Some funny memes for developers',
    image: `${config.HOST_URL}/images/site-preview.png`,
    type: 'website',
    ...customMeta,
  };

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${config.HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${config.HOST_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      {meta.date && <meta property="article:published_time" content={meta.date.toISOString()} />}
    </NextHead>
  );
};

export default Head;
