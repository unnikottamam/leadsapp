import React, { PropsWithChildren } from 'react'

const ErrorMesssage = ({ children }: PropsWithChildren) => {
    if (!children) return null;
    return <div className="bg-red-200 px-3 py-1 font-semibold text-sm rounded-md">{children}</div>
}

export default ErrorMesssage;