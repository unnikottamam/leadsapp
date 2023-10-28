import Button from '@/app/components/Button';
import prisma from '@/prisma/client';
import PageTitle from '@/app/components/PageTitle';
import { notFound } from 'next/navigation';
import React from 'react';
import LeadForm from './_components/LeadForm';

const LeadsPage = async () => {
    const leads = await prisma.lead.findMany({
        orderBy: {
            id: 'desc',
        }
    });
    if (!leads) notFound();
    return (
        <div className="overflow-x-auto">
            <PageTitle title="All Leads">
                <LeadForm />
            </PageTitle>
            <table className="table table-sm table-zebra-zebra">
                <thead>
                    <tr className="text-lg border-b-2 border-b-slate-300 text-slate-700">
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map(lead => {
                        return <tr key={lead.id}>
                            <td>{lead.firstName} {lead.lastName}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>
                                <div className="badge badge-sm badge-primary">
                                    {lead.status
                                        .split('_')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')}
                                </div>
                            </td>
                            <td className="text-right pr-0">
                                <Button className="btn-success text-xs" link={`/leads/${lead.id}`}>Details</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export const revalidate = 0;
export default LeadsPage