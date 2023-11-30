'use client';
import Button from '@/app/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react';

const SearchBar = () => {
    const formRef = useRef(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchInput, setSearchInput] = useState('');
    const onSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchInput) {
            params.append('search', searchInput);
        }
        ['filterBy', 'by'].forEach(param => {
            const value = searchParams.get(param);
            if (value) {
                params.append(param, value);
            }
        });
        const query = params.toString();
        setSearchInput('');
        router.push(`/leads${query ? `?${query}` : ''}`);
        router.refresh();
    };

    return (
        <form ref={formRef} onSubmit={onSearchSubmit} className="flex gap-2 items-center">
            <input
                type="text"
                placeholder="Type Name/Email/Phone"
                className="input input-bordered input-sm w-full max-w-xs"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit" className="btn-outline">
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
