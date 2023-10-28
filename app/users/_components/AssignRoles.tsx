"use client";
import DropDown from '@/app/components/DropDown';
import { Role, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const userRoles: Role[] = [
    'ADMIN',
    'EDITOR',
    'SUBSCRIBER'
];

const AssignRoles = ({ user }: { user: User }) => {
    const [userRole, setuserRole] = useState<string>(user.role);
    const router = useRouter();
    const { data, error, isLoading } = useQuery({
        queryKey: ['user', userRole],
        queryFn: () => {
            if (userRole && userRole !== user.role) {
                axios
                    .patch(`/api/users/${user.id}`, { role: userRole })
                    .then(data => {
                        router.push(`/users/${data.data.id}`);
                        router.refresh();
                    })
            }
            return null;
        },
        refetchOnWindowFocus: false,
        retry: 3
    });
    const onStatusChange = (status: string) => {
        if (status !== userRole) {
            setuserRole(status);
        }
    };
    return (
        <DropDown classes="dropdown-end" selected={user.role} options={userRoles} label="Select Role" onListChange={onStatusChange} />
    )
}

export default AssignRoles