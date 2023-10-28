"use client";
import React, { PropsWithChildren, useState } from 'react'
import Button from './Button'

interface ModalProps {
    title: string
    content?: string
    link?: string
    buttonText?: string,
    isOpen: boolean;
    onClose: () => void;
    action?: () => void
}

const Modal = ({ children, title, content, isOpen, onClose, link, buttonText, action }: PropsWithChildren<ModalProps>) => {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open" id="appModal">
            <div className="modal-box">
                <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-semibold text-xl">{title}</h3>
                <div className="py-4">{children || content}</div>
                {action && (
                    <div className="modal-action">
                        <Button onButtonClick={action}>{buttonText || "Close"}</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal