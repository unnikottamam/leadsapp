import PageTitle from '@/app/components/PageTitle';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import ClientForm from '../_components/ClientForm';
import TableCells from '@/app/components/TableCells';

const ClientPage = async ({ params: { id } }: Params) => {
    const client = await prisma.client.findUnique({
        where: { id: id }
    });
    if (!client) return notFound();

    const numLeads = await prisma.lead.count({
        where: { clientId: client.id }
    })

    const clientData = [
        { key: 'First Name', value: client.firstName },
        { key: 'Last Name', value: client.lastName },
        { key: 'Email', value: client.email },
    ];
    return (
        <>
            <div className="badge badge-info capitalize font-semibold">
                # Leads {numLeads}
            </div>
            <PageTitle title={client.firstName + " " + client.lastName}>
                <ClientForm client={client} />
            </PageTitle>
            <TableCells tableData={clientData} />
        </>
    )
}

export default ClientPage