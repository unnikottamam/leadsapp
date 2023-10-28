'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { BsFillFileEarmarkSpreadsheetFill } from 'react-icons/bs';

interface HeaderProps {
    className?: string;
}

const Header = ({ className }: PropsWithChildren<HeaderProps>) => {
    return (
        <header className={`navbar bg-primary text-primary-content fixed w-full z-50 top-0 left-0 ${className}`}>
            <div className="max-w-7xl mx-auto flex-1">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">
                        LeadsCRM
                        <BsFillFileEarmarkSpreadsheetFill />
                    </Link>
                </div>
                <AuthStatus />
            </div>
        </header>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession();
    if (status === 'loading')
        return null;

    if (status === "unauthenticated")
        return <Link className="btn btn-sm" href="/api/auth/signin">Login</Link>;

    return (
        <div className="flex-none">
            {status === "authenticated" && (
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-neutral btn-circle">
                        <div className="w-10 rounded-full flex justify-center text-lg">
                            {session!.user?.email?.charAt(0).toLocaleUpperCase()}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-24 text-slate-800 border border-slate-800">
                        <li><a>Settings</a></li>
                        <li><Link href="/api/auth/signout">Log out</Link></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Header