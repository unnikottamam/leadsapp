"use client";
import React, { useState } from 'react'
import Modal from './Modal';
import Button from './Button';
import { BiPlus } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Lead } from '@prisma/client';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { commentSchema } from '../validationSchemas/comments';
import z from 'zod';
import ErrorMesssage from './ErrorMesssage';

type commentFormData = z.infer<typeof commentSchema>;

const AddComment = ({ lead }: { lead: Lead }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<commentFormData>({
        resolver: zodResolver(commentSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const redirect = `/leads/${lead.id}`;
        const apiURL = `/api/comments`;
        try {
            await axios.post(apiURL, data);
            setIsModalOpen(false);
            router.push(redirect);
            router.refresh();
            reset();
        } catch (error) {
            toast.error("An unexpected error occurred");
        }
    });

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Notes" buttonText="Add Note">
                <form className="flex flex-col items-end" onSubmit={onSubmit}>
                    <div className="w-full">
                        <input
                            type="hidden"
                            value={lead.id}
                            {...register("leadId")}
                        />
                        <textarea
                            className="textarea textarea-bordered h-32 w-full"
                            placeholder="Add your notes"
                            {...register("comment")}></textarea>
                        {<ErrorMesssage>{errors.comment?.message}</ErrorMesssage>}
                    </div>
                    <Button className="btn-outline mt-3" size="sm">
                        Create A Note
                    </Button>
                </form>
            </Modal>
            <Button onButtonClick={openModal} className="btn-outline mt-3" size="sm">
                <BiPlus /> Add Note
            </Button>
            <Toaster />
        </>
    )
}

export default AddComment