"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMesssage from "@/app/components/ErrorMesssage";
import { Client } from "@prisma/client";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import toast, { Toaster } from 'react-hot-toast';
import { clientPatchSchema, clientSchema } from "@/app/validationSchemas/clients";

type clientFormData = z.infer<typeof clientSchema>;

const ClientForm = ({ client }: { client?: Client }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const router = useRouter();
    const initialValues = client ? client : {};
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<clientFormData>({
        resolver: zodResolver(client ? clientPatchSchema : clientSchema),
        defaultValues: initialValues,
    });

    const [error, setError] = useState<string>("");
    const onSubmit = handleSubmit(async (data) => {
        const redirect = client ? `/clients/${client.id}` : `/clients`;
        const apiURL = client ? `/api${redirect}` : `/api${redirect}`;
        try {
            if (!client) {
                await axios.post(apiURL, data);
            } else {
                await axios.patch(apiURL, data);
            }
            setIsModalOpen(false);
            router.push(redirect);
            router.refresh();
        } catch (error) {
            setError("An unexpected error occurred");
            toast.error("An unexpected error occurred");
        }
    });

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={client ? 'Edit Changes' : 'Create Client'}>
                <form className="flex flex-col space-y-3 max-w-md" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={client?.firstName || undefined}
                        placeholder="First Name"
                        {...register("firstName")}
                    />
                    {<ErrorMesssage>{errors.firstName?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={client?.lastName || undefined}
                        placeholder="Last Name"
                        {...register("lastName")}
                    />
                    {<ErrorMesssage>{errors.lastName?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={client?.email || undefined}
                        placeholder="Email Address"
                        {...register("email")}
                    />
                    {<ErrorMesssage>{errors.email?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={client?.phone || undefined}
                        placeholder="Phone Number"
                        {...register("phone")}
                    />
                    {<ErrorMesssage>{errors.phone?.message}</ErrorMesssage>}
                    <button className="btn btn-primary">{client ? 'Submit Changes' : 'Create Client'}</button>
                </form>
            </Modal>
            <Button onButtonClick={openModal}>
                {client ? 'Edit' : 'New Client'}
            </Button>
            <Toaster />
        </>
    );
};

export default ClientForm;