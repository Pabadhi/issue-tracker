'use client'
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const pathname = usePathname();
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
    <Link href="/"><FaBug/></Link>
    <ul className='flex space-x-6'>
        {links.map((link) => (
      <li key={link.href}>
        <Link
          className='text-gray-600 hover:text-gray-900 transition-colors'
          href={link.href}
        >
          {link.label}
        </Link>
      </li>
    ))}
      </ul>
    </nav>
  )
}

export default NavBar