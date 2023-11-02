import Button from '@/app/components/Button';
import prisma from '@/prisma/client';
import PageTitle from '@/app/components/PageTitle';
import { notFound } from 'next/navigation';
import React from 'react';
import LeadForm from './_components/LeadForm';
import { Lead, Status } from '@prisma/client';
import Link from 'next/link';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

interface Props {
    searchParams: {
        status: Status,
        orderBy: keyof Lead,
        by?: 'asc' | "desc"
    }
}

const LeadsPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const by = searchParams.by === 'asc' ? 'desc' : 'asc';

    const orderBy = searchParams.orderBy ? { [searchParams.orderBy]: by ? by : 'desc' } : undefined;
    const leads = await prisma.lead.findMany({
        where: {
            status,
        },
        orderBy
    });
    if (!leads) notFound();

    const columns: { label: string, value: keyof Lead }[] = [
        { label: "First Name", value: "firstName" },
        { label: "Last Name", value: "lastName" },
        { label: "Email", value: "email" },
        { label: "Phone", value: "phone" },
        { label: "Status", value: "status" },
        { label: "Created At", value: "createdAt" },
    ];
    return (
        <div className="overflow-x-auto">
            <PageTitle title="All Leads">
                <LeadForm />
            </PageTitle>
            <table className="table table-sm table-zebra-zebra">
                <thead>
                    <tr className="text-lg border-b-2 border-b-slate-300 text-slate-700">
                        {columns.map(column => {
                            let arrowIcon = <span></span>;
                            if (column.value === searchParams.orderBy) {
                                arrowIcon = by === 'asc' ? <BsArrowUp className="ml-1 inline" /> : <BsArrowDown className="ml-1 inline" />;
                            }
                            return (<th key={column.value}>
                                <Link className="flex items-center" href={{
                                    query: {
                                        ...searchParams,
                                        orderBy: column.value,
                                        by: by
                                    }
                                }}>
                                    {column.label}
                                    {arrowIcon}
                                </Link>
                            </th>)
                        })}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map(lead => {
                        const date = new Date(lead.createdAt);
                        const newDate = `${date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()} `
                        return <tr key={lead.id}>
                            <td>{lead.firstName}</td>
                            <td>{lead.lastName}</td>
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
                            <td>{newDate}</td>
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