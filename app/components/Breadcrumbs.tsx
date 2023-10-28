'use client';
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


const Breadcrumbs = () => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)
    if (!pathNames.length) return null;

    return (
        <div className="text-sm breadcrumbs border-b-2 mb-3 pt-0 capitalize font-semibold">
            <ul>
                {
                    pathNames.map((link, index) => {
                        const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                        const activeClass = paths === href ? "text-primary" : "";
                        return (
                            <React.Fragment key={index}>
                                <li className={activeClass} >
                                    {activeClass ? link : (<Link href={href}>{link}</Link>)}
                                </li>
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Breadcrumbs