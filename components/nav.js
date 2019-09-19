import React from 'react';
import Link from 'next/link';

const links = [
  { href: 'http://hubcore.org/', label: 'HUBCORE' },
  { href: 'https://github.com/savva-shishak/hubcore-site-frontend', label: 'GitHub' },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>

    <style jsx>
      {`
      
    `}
    </style>
  </nav>
);

export default Nav;
