import React, { useState } from 'react';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';

export const ResponsiveNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <MobileMenu>{navLinks}</MobileMenu>}
    </div>
  );
};

const pages = [
  { label: 'Home', href: '/' },
  { label: 'New Meme', href: '/new-meme' },
  { label: 'About', href: '/about' },
];
const navLinks = pages.map(page => (
  <Link key={page.label} href={page.href}>
    <a className="text-gray-900 dark:text-white px-6 py-4">{page.label}</a>
  </Link>
));

const Navbar = ({ menuOpen, setMenuOpen }) => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center">
      <ThemeSwitch />
      <a href="/" className="text-xl font-bold no-underline dark:text-white text-black">
        Crypto Memes
      </a>
    </div>
    <nav className="hidden md:block space-x-6">{navLinks}</nav>
    <button
      type="button"
      aria-label="Toggle mobile menu"
      onClick={() => setMenuOpen(!menuOpen)}
      className="rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
    >
      <MenuAlt4Svg menuOpen={menuOpen} />
    </button>
  </div>
);

const MobileMenu = ({ children }) => <nav className="p-4 flex flex-col space-y-3 md:hidden">{children}</nav>;

const MenuAlt4Svg = ({ menuOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`transition duration-100 ease h-8 w-8 ${menuOpen ? 'transform rotate-90' : ''}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
