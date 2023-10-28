"use client";
import DropDown from '@/app/components/DropDown'
import { Lead, Status } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const leadStatusList: Status[] = [
    'NEW',
    'OPEN',
    'IN_PROGRESS',
    'CLOSED'
];

const AssignStatus = ({ lead }: { lead: Lead }) => {
    const [leadStatus, setLeadStatus] = useState<string>(lead.status);
    const router = useRouter();
    const { data, error, isLoading } = useQuery({
        queryKey: ['lead', leadStatus],
        queryFn: () => {
            if (leadStatus && leadStatus !== lead.status) {
                axios
                    .patch(`/api/leads/${lead.id}`, { status: leadStatus })
                    .then(data => {
                        router.push(`/leads/${data.data.id}`)
                        router.refresh();
                    })
            }
            return null;
        },
        refetchOnWindowFocus: false,
        retry: 3
    });
    const onStatusChange = (status: string) => {
        if (status !== leadStatus) {
            setLeadStatus(status);
        }
    };

    return (
        <DropDown classes="dropdown-end" selected={leadStatus} options={leadStatusList} label="Change Status" onListChange={onStatusChange} />
    )
}


export default AssignStatus