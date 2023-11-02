import Button from '@/app/components/Button';
import PageTitle from '@/app/components/PageTitle';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import CreateClient from '../_components/CreateClient';
import { BsEye } from 'react-icons/bs';
import AddComment from '@/app/components/AddComment';
import LeadForm from '../_components/LeadForm';
import AssignStatus from '../_components/AssignStatus';
import TableCells from '@/app/components/TableCells';

const LeadPage = async ({ params: { id } }: Params) => {
    const lead = await prisma.lead.findUnique({
        where: { id: id },
        include: {
            comments: {
                orderBy: {
                    id: "desc"
                },
                include: {
                    client: true
                }
            }
        }
    });
    if (!lead) return notFound();

    const leadData = [
        { key: 'First Name', value: lead.firstName },
        { key: 'Last Name', value: lead.lastName },
        { key: 'Email', value: lead.email },
    ];

    const comments = lead.comments.map(({ id, client, comment, createdAt }) => {
        return (
            <div key={id}>
                <div className="divider my-2"></div>
                <div className="">
                    <p className="font-semibold">{comment}</p>
                    {client && `<p>${client?.firstName + " " + client?.lastName}</p>`}
                    <div><em>Date: {createdAt.toLocaleDateString()}</em></div>
                </div>
            </div>
        )
    });

    return (
        <>
            <div className="flex">
                <div className="badge badge-info capitalize font-semibold">
                    {lead.status
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')}
                </div>
            </div>
            <PageTitle title="Lead Details">
                <AssignStatus lead={lead} />
                {lead.clientId && (
                    <Button className="btn-outline" link={"/clients/" + lead.clientId}>
                        <BsEye />
                        View Client
                    </Button>
                )}
                {!lead.clientId && <CreateClient lead={lead} />}
                <LeadForm lead={lead} />
            </PageTitle>
            <div className="md:grid grid-cols-2 gap-4">
                <TableCells tableData={leadData} />
                <div className="mt-5 md:mt-0 px-5 py-4 border bg-base-100 shadow-xl">
                    <PageTitle noBorder={true} size="md" title="Notes">
                        <AddComment lead={lead} />
                    </PageTitle>
                    {comments}
                </div>
            </div>
        </>
    )
}

export const revalidate = 0;
export default LeadPage