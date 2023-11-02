import React, { PropsWithChildren } from "react";
import NavBar from '@/app/components/NavBar';
import Header from '@/app/components/Header';
import Breadcrumbs from "../components/Breadcrumbs";

const DashboardPage = ({ children }: PropsWithChildren) => {
    const navLinks = [
        { text: 'Leads', href: '/leads' },
        { text: 'Clients', href: '/clients' },
        { text: 'Users', href: '/users' }
    ];

    return (
        <>
            <Header />
            <section className="container max-w-7xl mx-auto md:flex">
                <NavBar navBarItems={navLinks} className="md:w-2/12"></NavBar>
                <main className="md:w-10/12 px-2 md:pr-0 md:pl-6 pb-5 pt-4 md:pt-24">
                    <Breadcrumbs />
                    {children}
                </main>
            </section>
        </>
    )
}

export default DashboardPage