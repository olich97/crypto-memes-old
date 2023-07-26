import Link from 'next/link';
import React from 'react';
import { MetaProps } from '../lib/types/layout';
import Head from './Head';
import { ResponsiveNavBar } from './Navbar';
import Wallet from './Wallet';

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <div className="top-2 w-48 -left-12 mt-3 py-1 text-center -rotate-45 rounded-lg absolute z-30 bg-red-500 text-gray-100 text-xs md:text-sm font-medium md:block">
        <a className="text-white" target="_blank" rel="noreferrer" href="https://sepolia.etherscan.io/">
          Sepolia<br></br>Testnet
        </a>
      </div>
      <header>
        <div className="max-w-4xl px-1 mx-auto">
          <ResponsiveNavBar />
          <div className="relative">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-4xl px-8 py-4 mx-auto">{children}</div>
        <div className="fixed bottom-10" style={{ left: '5%', zIndex: 100 }}>
          <Wallet />
        </div>
      </main>
      <footer className="max-w-4xl px-1 mx-auto py-3">
        <div className="relative">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="max-w-4xl px-8 mx-auto">
          Built by{' '}
          <a
            className="text-gray-900 dark:text-white"
            href="https://github.com/olich97"
            target="_blank"
            rel="noreferrer"
          >
            Oleh Andrushko
          </a>
        </div>
        <div className="max-w-4xl px-8 mx-auto">
          <Link href="/privacy">
            <a className="text-gray-900 dark:text-white"> Privacy Policy</a>
          </Link>
        </div>
        <div className="max-w-4xl px-8 mx-auto">
          <a
            className="text-gray-900 dark:text-white"
            target="_blank"
            href="https://github.com/olich97/crypto-memes"
            rel="noreferrer"
          >
            Source Code
          </a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
