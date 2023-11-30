import PageTitle from '@/app/components/PageTitle';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import AssignRoles from '../_components/AssignRoles';
import UserForm from '../_components/UserForm';
import TableCells from '@/app/components/TableCells';

const UserPage = async ({ params }: Params) => {
    const user = await prisma.user.findUnique({
        where: { id: params.id }
    });
    if (!user) notFound();

    const userData = [
        { key: 'First Name', value: user.firstName },
        { key: 'Last Name', value: user.lastName },
        { key: 'Email', value: user.email },
    ];
    return (
        <>
            <div className="badge badge-info capitalize font-semibold">{user.role.toLowerCase()}</div>
            <PageTitle title={user.firstName || user.email!}>
                <AssignRoles user={user} />
                <UserForm user={user} />
            </PageTitle>
            <TableCells tableData={userData} />
        </>
    )
}

export default UserPage