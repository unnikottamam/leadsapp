import Button from '@/app/components/Button';
import prisma from '@/prisma/client';
import PageTitle from '@/app/components/PageTitle';
import React from 'react'
import UserForm from './_components/UserForm';

const UsersPage = async () => {
    const users = await prisma.user.findMany({
        where: { archive: false },
        orderBy: { id: 'desc' }
    });

    return (
        <div className="overflow-x-auto">
            <PageTitle title="All Users">
                <UserForm />
            </PageTitle>
            <table className="table table-sm table-zebra-zebra">
                <thead>
                    <tr className="text-lg border-b-2 border-b-slate-300 text-slate-700">
                        <th>
                            Full Name
                        </th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => {
                        return <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td><div className="badge badge-sm badge-primary">{user.role}</div></td>
                            <td className="text-right pr-0"><Button className="btn-success text-xs" link={`/users/${user.id}`}>Details</Button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UsersPage;