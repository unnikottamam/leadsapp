"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadPatchSchema, leadSchema } from "@/app/validationSchemas/leads";
import { z } from "zod";
import ErrorMesssage from "@/app/components/ErrorMesssage";
import { Lead } from "@prisma/client";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";

type LeadCreateFormData = z.infer<typeof leadSchema>;

const LeadForm = ({ lead }: { lead?: Lead }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const router = useRouter();
    const initialValues = lead ? lead : {};
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LeadCreateFormData>({
        resolver: zodResolver(lead ? leadPatchSchema : leadSchema),
        defaultValues: initialValues,
    });

    const [error, setError] = useState<string>("");
    const onSubmit = handleSubmit(async (data) => {
        try {
            const redirect = lead ? `/leads/${lead.id}` : `/leads`;
            if (lead) await axios.patch(`/api${redirect}`, data);
            else await axios.post(`/api${redirect}`, data);
            router.push(redirect);
            router.refresh();
            setIsModalOpen(false);
        } catch (error) {
            setError("An unextected error occurred");
        }
    });

    return (
        <>
            {error && (
                <div className="alert alert-error"><span>{error}</span></div>
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={lead ? 'Edit Changes' : 'Create Lead'}>
                <form className="flex flex-col space-y-3 max-w-md" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={lead?.firstName}
                        placeholder="First Name"
                        {...register("firstName")}
                    />
                    {<ErrorMesssage>{errors.firstName?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={lead?.lastName}
                        placeholder="Last Name"
                        {...register("lastName")}
                    />
                    {<ErrorMesssage>{errors.lastName?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={lead?.email}
                        placeholder="Email Address"
                        {...register("email")}
                    />
                    {<ErrorMesssage>{errors.email?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={lead?.phone || undefined}
                        placeholder="Phone Number"
                        {...register("phone")}
                    />
                    {<ErrorMesssage>{errors.phone?.message}</ErrorMesssage>}
                    <textarea className="textarea textarea-bordered w-full" placeholder="Message" {...register("message")}></textarea>
                    <button className="btn btn-primary">{lead ? 'Submit Changes' : 'Create Lead'}</button>
                </form>
            </Modal>
            <Button onButtonClick={openModal}>
                {lead ? 'Edit' : 'New Lead'}
            </Button>
        </>
    );
};

export default LeadForm;