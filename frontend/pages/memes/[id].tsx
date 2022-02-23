import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { MetaProps } from '../../lib/types/layout';
import Image from 'next/image';
import { buyMeme, getCurrentAddress, getMeme, setMemeSale } from '../../lib/cryptoMemeContract';
import { ellipseAddress } from '../../lib/wallet/utilities';
import Alert from '../../components/Alert';
import { AlertTypes } from '../../lib/types/alert';
export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  };
}

const MemePage = ({ params }): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const [meme, setMeme] = useState(null);
  const [isError, setError] = useState(false);
  const [isMemeOwner, setIsOwner] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [operationResult, setOperationResult] = useState({ isError: false, message: '', description: '' });
  const [showAlert, setShowAlert] = useState(false);

  const { id } = params;

  const copyToClipBoard = async targetText => {
    try {
      await navigator.clipboard.writeText(targetText);
      setCopySuccess('Copied!');
      setTimeout(() => {
        setCopySuccess('');
      }, 1000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  const checkMemeOwner = async (): Promise<boolean> => {
    try {
      const address = getCurrentAddress();
      if (address === meme?.owner) {
        setIsOwner(true);
        return true;
      }

      setIsOwner(false);
      return false;
    } catch (err) {
      setIsOwner(false);
      return false;
    }
  };

  const setMemeForSale = async (memeId: string, isForSale: boolean) => {
    const result = await setMemeSale(memeId, isForSale);
    if (result.isError) {
      setOperationResult({
        isError: result.isError,
        message: 'Ops, ',
        description: result.message,
      });
      setShowAlert(true);
    }
  };

  const buy = async (memeId: string, price: number) => {
    const result = await buyMeme(memeId, price);
    if (result.isError) {
      setOperationResult({
        isError: result.isError,
        message: 'Ops, ',
        description: result.message,
      });
      setShowAlert(true);
    }
  };

  const loadMeme = useCallback(async () => {
    setLoading(true);
    const result = await getMeme(id.toString());

    if (!result.isError) {
      setMeme(result.data);
    }

    setError(result.isError);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMeme();
  }, [loadMeme]);

  useEffect(() => {
    checkMemeOwner();
  }, [checkMemeOwner]);

  const customMeta: MetaProps = {
    title: `${meme?.text} - Crypto Memes`,
    description: meme?.text,
    image: meme?.content,
    date: meme?.createdAt,
    type: 'article',
  };
  return (
    <Layout customMeta={customMeta}>
      {isLoading && <Loader />}
      {isError && <div>failed to load</div>}
      {meme && (
        <article>
          <h1 className="mb-3 text-gray-900 dark:text-white">{meme.text}</h1>
          <div className="relative h-full w-full md:h-7/12 lg:h-9/12 md:w-7/12 lg:w-9/12">
            <Image
              src={meme.content}
              alt={meme.text}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          {operationResult.isError && showAlert && operationResult.message != '' && (
            <div>
              <Alert
                type={AlertTypes.Error}
                header={operationResult.message}
                message={operationResult.description}
                onClose={() => setShowAlert(false)}
              />
            </div>
          )}
          <div className="pb-3 text-center tracking-wide md:flex justify-around py-6">
            <div className="owner">
              <p className="text-sm uppercase">Owner</p>
              <div className="flex text-center" onClick={() => copyToClipBoard(meme.owner)}>
                <p className="text-lg font-semibold cursor-pointer px-2">{ellipseAddress(meme.owner)}</p>
                <svg className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </div>
              {copySuccess}
            </div>
            <div className="price">
              <p className=" text-sm uppercase">Price</p>
              <p className="text-lg font-semibold px-2">{meme.price} MTC</p>
            </div>
            <div className="created">
              <p className=" text-sm uppercase">Created At</p>
              <p className="text-lg font-semibold px-2">{meme.createdAt.toDateString()}</p>
            </div>
            {!isMemeOwner && meme.isForSale && (
              <div className="buy">
                <p className=" text-sm uppercase">Wanna Buy?</p>
                <button
                  onClick={() => buy(meme.id, meme.price)}
                  className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  BUY!
                </button>
              </div>
            )}
            {isMemeOwner && !meme.isForSale && (
              <div className="buy">
                <p className="text-sm uppercase">Wanna Sell?</p>
                <button
                  onClick={() => setMemeForSale(meme.id, true)}
                  className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Enable Sale
                </button>
              </div>
            )}
            {isMemeOwner && meme.isForSale && (
              <div className="buy">
                <p className=" text-sm uppercase">DO NOT Wanna Sell?</p>
                <button
                  onClick={() => setMemeForSale(meme.id, false)}
                  className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Disable Sale
                </button>
              </div>
            )}
          </div>
        </article>
      )}
    </Layout>
  );
};

export default MemePage;
