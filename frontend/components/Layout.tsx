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
        <div className="absolute bottom-10 right-24" style={{ right: '12%' }}>
          <Wallet />
        </div>
      </main>
      <footer className="py-8">
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
