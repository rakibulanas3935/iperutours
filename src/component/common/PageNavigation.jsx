import Link from 'next/link'
import React from 'react'


const PageNavigation = ({ title }) => {
    return (
        <div className="text-xl flex items-center gap-3 font-semibold py-3 mb-3 text-brand-primary">
            <Link href="/">Home /</Link>
            <span className="text-md text-brand-secondary">
                {title}
            </span>
        </div>
    )
}

export default PageNavigation

