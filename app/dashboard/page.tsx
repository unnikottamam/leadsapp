import React, { PropsWithChildren } from "react";
import NavBar from '@/app/components/NavBar';
import Header from '@/app/components/Header';
import Breadcrumbs from "../components/Breadcrumbs";
import authOptions from "../auth/authOptions";
import { getServerSession } from "next-auth";

const DashboardPage = ({ children }: PropsWithChildren) => {
    const session = getServerSession(authOptions);
    const navLinks = [
        { text: 'Leads', href: '/leads' },
        { text: 'Clients', href: '/clients' },
        { text: 'Users', href: '/users' }
    ];

    return (
        <>
            <Header />
            <section className="container max-w-7xl mx-auto flex">
                <NavBar navBarItems={navLinks} className="w-2/12"></NavBar>
                <main className="w-10/12 pl-6 pb-5 pt-24">
                    <Breadcrumbs />
                    {children}
                </main>
            </section>
        </>
    )
}

export default DashboardPage