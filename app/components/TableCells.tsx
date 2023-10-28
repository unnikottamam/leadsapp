"use client";
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Button from './Button';
import { BiCopyAlt } from 'react-icons/bi';

interface TableCellsProps {
    tableData: Array<{ key: string | null; value: string | null }>;
}

const TableCells = ({ tableData }: TableCellsProps) => {
    if (!tableData) return null;

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied");
        } catch (error) {
            toast.error("Failed to copy");
        }
    };

    return (
        <>
            <dl className="divide-y divide-gray-200">
                {tableData.map((item, index) => (
                    <div key={index} className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <Button
                                type="button"
                                size="xs"
                                onButtonClick={() => copyToClipboard(item.value || "")}
                                className="mr-2 btn-outline">
                                <BiCopyAlt />
                            </Button>
                            {item.key}
                        </dt>
                        <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {item.value}
                        </dd>
                    </div>
                ))}
            </dl>
            <Toaster />
        </>
    )
}

export default TableCells