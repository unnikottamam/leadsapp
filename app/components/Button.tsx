import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset"
    link?: string
    className?: string,
    size?: 'sm' | 'xs' | 'lg',
    onButtonClick?: () => void
}

const Button = ({
    children,
    type,
    link,
    className,
    size,
    onButtonClick
}: PropsWithChildren<ButtonProps>) => {
    const btnSize = size || 'sm';
    const classes = `btn btn-primary ${className ? className : ''} btn-${btnSize}`;
    if (link) {
        return <Link onClick={onButtonClick} href={link} className={classes}>{children}</Link>;
    }
    return <button onClick={onButtonClick} type={type} className={classes}>{children}</button>;
};

export default Button;
