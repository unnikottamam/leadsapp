"use client";
import Button from '@/app/components/Button';
import { Lead } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';

const CreateClient = ({ lead }: { lead: Lead }) => {
    const router = useRouter();
    const onClientCreateClick = async () => {
        await axios
            .post('/api/clients', { leadId: lead.id })
            .then((client) => {
                toast.success("Created a new client based on the lead information")
                router.push("/clients/" + client.data.id);
                router.refresh();
            })
            .catch(() => {
                toast.error("Client could not be created")
            });
    }
    return (
        <>
            <Button onButtonClick={onClientCreateClick} className="btn-outline">
                <BiPlus /> Create Client
            </Button>
            <Toaster />
        </>
    )
}

export default CreateClient