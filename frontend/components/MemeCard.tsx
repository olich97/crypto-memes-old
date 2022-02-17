import Link from 'next/link';
import React from 'react';
import { MemeType } from '../lib/types/meme';
import Image from 'next/image';

const MemeCard = ({ meme }: { meme?: MemeType }): JSX.Element => {
  return (
    <div className="flow-root">
      <div className="box-border md:box-content">
        <div>
          <Link href={{ pathname: '/memes/[id]', query: { id: meme.id } }}>
            <header className="cursor-pointer text-xl font-extrabold py-4">{meme.text}</header>
          </Link>
          <Link href={{ pathname: '/memes/[id]', query: { id: meme.id } }}>
            <div className="relative h-128 w-full md:h-7/12 lg:h-9/12 md:w-7/12 lg:w-9/12 cursor-pointer">
              <Image
                src={meme.contentUrl}
                alt={meme.code}
                layout="fill" // required
                objectFit="cover" // change to suit your needs
              />
            </div>
          </Link>
        </div>

        <footer className="text-right px-1 text-gray-500" hidden>
          <button className="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600">
            GET STARTED
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MemeCard;
