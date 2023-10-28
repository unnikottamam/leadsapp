import React, { PropsWithChildren } from 'react';

interface TitleProps {
    title?: string,
    size?: 'xl' | 'sm' | 'lg' | 'md',
    noBorder?: boolean
}

const PageTitle = ({ children, title, size, noBorder }: PropsWithChildren<TitleProps>) => {
    const textSize = size || 'xl';
    return (
        <>
            <div className="flex justify-between place-items-end">
                <div className={children ? "w-7/12" : "w-full"}>
                    <h1 className={`font-semibold text-${textSize}`}>{title}</h1>
                </div>
                {children && (<div className="flex space-x-2">{children}</div>)}
            </div>
            {!noBorder && <hr className="mt-2 mb-5 border-b-2" />}
        </>
    )
}

export default PageTitle