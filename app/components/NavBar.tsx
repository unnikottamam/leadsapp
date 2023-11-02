"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

interface NavProps {
    className?: string;
    navBarItems: Array<{ text: string; href: string }>;
}

const NavBar = ({ className, navBarItems }: PropsWithChildren<NavProps>) => {
    const pathname = usePathname();

    if (!navBarItems) return null;
    return (
        <nav className={`md:text-sm md:leading-6 relative bg-base-200 border-r-2 md:min-h-screen pt-16 pb-1 md:pt-24 md:pb-5 shadow-lg ${className}`}>
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost md:hidden">
                    MENU
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 md:hidden">
                    {navBarItems.map((link) => (
                        <li key={link.href}>
                            <Link className={`btn-block btn btn-sm justify-start ${pathname === link.href ? 'btn-primary btn-sm' : ''}`} href={link.href}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="px-7 flex-col gap-2 font-semibold text-lg text-slate-900 dark:text-slate-200 hidden md:block">
                    {navBarItems.map((link) => (
                        <li key={link.href}>
                            <Link className={`btn-block btn btn-sm justify-start ${pathname === link.href ? 'btn-primary btn-sm' : ''}`} href={link.href}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar