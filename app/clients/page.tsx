import Button from '@/app/components/Button';
import prisma from '@/prisma/client';
import PageTitle from '@/app/components/PageTitle';
import React from 'react';
import ClientForm from './_components/ClientForm';

const ClientsPage = async () => {
    const clients = await prisma.client.findMany({
        where: { archive: false },
        orderBy: { id: 'desc' },
        include: {
            _count: {
                select: { leads: true },
            },
        },
    });
    return (
        <div className="overflow-x-auto">
            <PageTitle title="All Clients">
                <ClientForm />
            </PageTitle>
            <table className="table table-sm table-zebra-zebra">
                <thead>
                    <tr className="text-lg border-b-2 border-b-slate-300 text-slate-700">
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>No. Leads</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => {
                        return <tr key={client.id}>
                            <td>{client.firstName} {client.lastName}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td><div className="badge badge-sm badge-primary">{client._count.leads}</div></td>
                            <td className="text-right pr-0"><Button className="btn-success text-xs" link={`/clients/${client.id}`}>Details</Button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export const revalidate = 0;
export default ClientsPage