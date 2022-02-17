import { format } from 'date-fns';
import React from 'react';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { getMeme } from '../../lib/memeService';
import { MetaProps } from '../../lib/types/layout';
import Image from 'next/image';
export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  };
}

const MemePage = ({ params }): JSX.Element => {
  const { id } = params;
  const { meme, isLoading, isError } = getMeme(id.toString());

  const customMeta: MetaProps = {
    title: `${meme?.text} - Crypto Memes`,
    description: meme?.text,
    image: meme?.contentUrl,
    date: meme?.publishDate,
    type: 'article',
  };
  return (
    <Layout customMeta={customMeta}>
      {isLoading && <Loader />}
      {isError && <div>failed to load</div>}
      {meme && (
        <article>
          <h1 className="mb-3 text-gray-900 dark:text-white">{meme.text}</h1>
          <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
            {meme.publishDate && format(meme.publishDate, 'MMMM dd, yyyy')}
          </p>
          <div className="relative h-full w-full md:h-7/12 lg:h-9/12 md:w-7/12 lg:w-9/12">
            <Image
              src={meme.contentUrl}
              alt={meme.code}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
        </article>
      )}
    </Layout>
  );
};

export default MemePage;
