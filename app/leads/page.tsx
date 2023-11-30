import Button from '@/app/components/Button';
import prisma from '@/prisma/client';
import PageTitle from '@/app/components/PageTitle';
import { notFound } from 'next/navigation';
import React from 'react';
import LeadForm from './_components/LeadForm';
import { Lead, Status } from '@prisma/client';
import Link from 'next/link';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import SearchBar from '../components/SearchBar';

interface Props {
    searchParams: {
        status: Status,
        filterBy: keyof Lead,
        by?: 'asc' | "desc",
        search?: string
    }
}

const LeadsPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const by = searchParams.by === 'asc' ? 'desc' : 'asc';

    const leadWhere = {
        status: statuses.includes(searchParams.status) ? searchParams.status : undefined,
        ...(searchParams.search
            ? {
                OR: [
                    { firstName: { contains: searchParams.search } },
                    { lastName: { contains: searchParams.search } },
                    { email: { contains: searchParams.search } },
                    { phone: { contains: searchParams.search } },
                ],
            }
            : {}),
    };

    const orderBy = searchParams.filterBy ? { [searchParams.filterBy]: by ? by : 'desc' } : undefined;
    const leads = await prisma.lead.findMany({
        where: leadWhere,
        orderBy
    });

    if (!leads) notFound();
    let searchTitle = searchParams.search ? <h3 className="text-xl font-bold border-b-2 text-primary">
        Search Rsults For: {searchParams.search}
    </h3> : "";

    return (
        <div className="overflow-x-auto">
            <PageTitle title="All Leads">
                <SearchBar />
                <LeadForm />
            </PageTitle>
            {searchTitle}
            <table className="table table-sm table-zebra-zebra">
                <thead>
                    <tr className="text-lg border-b-2 border-b-slate-300 text-slate-700">
                        {columns.map(column => {
                            let arrowIcon = <span></span>;
                            if (column.value === searchParams.filterBy) {
                                arrowIcon = by === 'asc' ? <BsArrowUp className="ml-1 inline" /> : <BsArrowDown className="ml-1 inline" />;
                            }
                            return (<th key={column.value}>
                                <Link className="flex items-center" href={{
                                    query: {
                                        ...searchParams,
                                        filterBy: column.value,
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
                            <td>{date.toLocaleDateString('en-US')}</td>
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

const columns: { label: string, value: keyof Lead }[] = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "Status", value: "status" },
    { label: "Created At", value: "createdAt" },
];

export const dynamic = 'force-dynamic';
export default LeadsPage