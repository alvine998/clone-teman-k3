import { RxHamburgerMenu } from 'react-icons/rx'
import { FaHome, FaUserFriends, FaBook, FaUser } from 'react-icons/fa'
import { useState } from 'react'

type Props = {
    open: boolean,
    setOpen: any
}

export default function Topbar(props: Props) {
    const { open, setOpen } = props
    return (
        <div className={`w-full ${open ? "h-100 absolute" : "h-20"} transition-all duration-300 p-2 bg-[#15406A] z-40`}>
            <div className='flex justify-between items-center transition-all duration-300'>
                <a href="https://temank3.kemnaker.go.id">
                    <img src="https://temank3.kemnaker.go.id/public/themes/website/asset/img/logo.png" alt="logo" className='w-[170px] h-[58px]' />
                </a>
                <div className='sm:block hidden sm:px-5 px-0'>
                    <ul className='flex'>
                        <li className='flex items-center px-4 py-2 gap-1'><FaHome className='text-lg text-white' /><a href="/main/dashboard" className="block text-white">Beranda</a></li>
                        <li className='flex items-center px-4 py-2 gap-1'><FaUserFriends className='text-lg text-white' /><a href="/main/member/list" className="block text-white">Personel K3</a></li>
                        <li className='flex items-center px-4 py-2 gap-1'><a href="/auth/login" className="block text-white">Logout</a></li>
                    </ul>
                </div>
                <button onClick={() => {
                    setOpen(!open)
                }} className='border sm:hidden border-[#FFFFFF8C] focus:border-2 p-2 rounded-md w-16 flex items-center justify-center'>
                    <RxHamburgerMenu className='text-[#FFFFFF8C]' fontSize={30} />
                </button>
            </div>
            <div className={`${open ? "block" : "hidden"}`} id='dropdown-menu'>
                <ul>
                    <li className='flex items-center px-4 py-2 gap-1'><FaHome className='text-lg text-white' /><a href="/main/dashboard" className="block text-white">Beranda</a></li>
                    <li className='flex items-center px-4 py-2 gap-1'><FaUserFriends className='text-lg text-white' /><a href="/main/member/list" className="block text-white">Personel K3</a></li>
                    <li className='flex items-center px-4 py-2 gap-1'><a href="/auth/login" className="block text-white">Logout</a></li>
                </ul>
            </div>
        </div>
    )
}
