"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, userPatchSchema } from "@/app/validationSchemas/user";
import { z } from "zod";
import ErrorMesssage from "@/app/components/ErrorMesssage";
import { User } from "@prisma/client";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import toast, { Toaster } from 'react-hot-toast';

type userFormData = z.infer<typeof userSchema>;

const UserForm = ({ user }: { user?: User }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const router = useRouter();
    const initialValues = user ? user : {};
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<userFormData>({
        resolver: zodResolver(user ? userPatchSchema : userSchema),
        defaultValues: initialValues,
    });

    const [error, setError] = useState<string>("");
    const onSubmit = handleSubmit(async (data) => {
        const redirect = user ? `/users/${user.id}` : `/users`;
        const apiURL = user ? `/api${redirect}` : `/api${redirect}`;
        try {
            if (!user) {
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
            <Modal isOpen={isModalOpen} onClose={closeModal} title={user ? 'Edit Changes' : 'Create User'}>
                <form className="flex flex-col space-y-3 max-w-md" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={user?.firstName || undefined}
                        placeholder="First Name"
                        {...register("firstName")}
                    />
                    {<ErrorMesssage>{errors.firstName?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={user?.lastName || undefined}
                        placeholder="Last Name"
                        {...register("lastName")}
                    />
                    {<ErrorMesssage>{errors.lastName?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={user?.email || undefined}
                        placeholder="Email Address"
                        {...register("email")}
                    />
                    {<ErrorMesssage>{errors.email?.message}</ErrorMesssage>}
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={user?.phone || undefined}
                        placeholder="Phone Number"
                        {...register("phone")}
                    />
                    {<ErrorMesssage>{errors.phone?.message}</ErrorMesssage>}
                    {!user && (
                        <>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Password"
                                {...register("password")}
                            />
                            <ErrorMesssage>{errors.password?.message}</ErrorMesssage>
                        </>
                    )}
                    <button className="btn btn-primary">{user ? 'Submit Changes' : 'Create User'}</button>
                </form>
            </Modal>
            <Button onButtonClick={openModal}>
                {user ? 'Edit' : 'New User'}
            </Button>
            <Toaster />
        </>
    );
};

export default UserForm;