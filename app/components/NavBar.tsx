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
        <nav className={`lg:text-sm lg:leading-6 relative bg-base-200 border-r-2 min-h-screen pt-24 pb-5 shadow-lg ${className}`}>
            <ul className="px-7 flex flex-col gap-2 font-semibold text-lg text-slate-900 dark:text-slate-200">
                {navBarItems.map((link) => (
                    <li key={link.href}>
                        <Link className={`btn-block btn btn-sm justify-start ${pathname === link.href ? 'btn-primary btn-sm' : ''}`} href={link.href}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar