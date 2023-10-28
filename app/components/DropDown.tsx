"use client";
import React, { useState } from 'react';

interface DropdownProps {
    options: string[];
    label: string;
    selected?: string;
    classes?: string;
    onListChange?: (status: string) => void;
}

const DropDown = ({ options, label, selected, classes, onListChange }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(selected || null);

    const handleOptionClick = (option: string) => {
        if (onListChange && selectedOption !== option) {
            onListChange(option);
        }
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen((status) => !status);
    };

    const dropdownClass = isOpen ? 'open' : '';

    return (
        <div className={`dropdown ${classes} ${dropdownClass}`}>
            <label
                tabIndex={0}
                className="btn btn-sm btn-secondary btn-outline"
                onClick={toggleDropdown}
            >
                {label}
            </label>
            {isOpen && (
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36"
                >
                    {options.map((option) => (
                        <li key={option} onClick={() => handleOptionClick(option)}>
                            <span className={selectedOption === option ? 'active' : ''}>
                                {option
                                    .split('_')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                    .join(' ')}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropDown;