import React, { useState } from 'react'
import Topbar from './Topbar'

export default function Layout({ children }: any) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className='relative'>
            <Topbar open={open} setOpen={setOpen} />
            <div className={`${open ? "pt-24" : ""}`}>
                {children}
            </div>
        </div>
    )
}
