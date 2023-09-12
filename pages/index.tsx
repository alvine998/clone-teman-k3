import Image from 'next/image'
import { Inter } from 'next/font/google'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaHome, FaFlag, FaBook, FaUser } from 'react-icons/fa'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className='relative'>
      <div className={`w-full ${open ? "h-100 absolute" : "h-20"} transition-all duration-300 p-2 bg-[#15406A]`}>
        <div className='flex justify-between items-center'>
          <a href="https://temank3.kemnaker.go.id">
            <img src="https://temank3.kemnaker.go.id/public/themes/website/asset/img/logo.png" alt="logo" className='w-[170px] h-[58px]' />
          </a>
          <div className='sm:block hidden sm:px-5 px-0'>
            <ul className='flex'>
              <li className='flex items-center px-4 py-2 gap-1'><FaHome className='text-lg text-white' /><a href="https://temank3.kemnaker.go.id" className="block text-white">BERANDA</a></li>
              <li className='flex items-center px-4 py-2 gap-1'><FaFlag className='text-lg text-white' /><a href="https://temank3.kemnaker.go.id/page/flowchart" className="block text-white">FLOW CHART LAYANAN</a></li>
              <li className='flex items-center px-4 py-2 gap-1'><a href="https://temank3.kemnaker.go.id/page/news" className="block text-white">INFO & ARTIKEL</a></li>
              <li className='flex items-center px-4 py-2 gap-1'><FaBook className='text-lg text-white' /><a href="https://temank3.kemnaker.go.id/page/perundangan" className="block text-white">DOKUMEN K3</a></li>
              <li className='flex items-center px-4 py-2 gap-1'><FaUser className='text-lg text-white' /><a href="https://temank3.kemnaker.go.id/page/kontak" className="block text-white">HUBUNGI KAMI</a></li>
              <li className='flex items-center px-4 py-2 gap-1'><a href="https://temank3.kemnaker.go.id/login" className="block text-white">LOGIN</a></li>
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
            <li className='flex items-center px-4 py-2 gap-1'><FaHome className='text-lg text-white' /><a href="https://temank3.kemnaker.go.id" className="block text-white">BERANDA</a></li>
            <li className='flex items-center px-4 py-2 gap-1'><FaFlag className='text-lg text-white' /><a href="https://temank3.kemnaker.go.id/page/flowchart" className="block text-white">FLOW CHART LAYANAN</a></li>
            <li className='flex items-center px-4 py-2 gap-1'><a href="https://temank3.kemnaker.go.id/page/news" className="block text-white">INFO & ARTIKEL</a></li>
            <li className='flex items-center px-4 py-2 gap-1'><FaBook className='text-lg text-white' /><a href="https://temank3.kemnaker.go.id/page/perundangan" className="block text-white">DOKUMEN K3</a></li>
            <li className='flex items-center px-4 py-2 gap-1'><FaUser className='text-lg text-white' /><a href="https://temank3.kemnaker.go.id/page/kontak" className="block text-white">HUBUNGI KAMI</a></li>
            <li className='flex items-center px-4 py-2 gap-1'><a href="https://temank3.kemnaker.go.id/login" className="block text-white">LOGIN</a></li>
          </ul>
        </div>
      </div>
      <div className={`sm:px-20 px-0 p-4 ${open ? "pt-24" : ""} `}>
        <h1 className='text-3xl text-[#5a5a5a] text-center font-semibold'>Hasil Scan QRCODE Personel</h1>
        <div className='border-4 sm:border-[7px] sm:rounded-xl border-[#15406A] rounded-lg bg-white mt-2'>
          <div className='bg-[#15406A] w-full p-1 mt-2'>
            <h1 className='text-center font-semibold text-xl text-white'>BIODATA PERSONEL</h1>
          </div>
          <div className='flex flex-col items-center mt-2 mb-4'>
            <img alt='photo-user' src='https://temank3.kemnaker.go.id/public/uploads/photo/Bintang Siagian-1212051306960002-230623013849.png' className='w-[150px] h-[200px]' />
            <p className='font-bold text-sm mt-1'>Nama: Tatang Sutisna</p>
            <p className='font-bold text-sm mt-1'>Tempat Lahir: Sukabumi</p>
            <p className='font-bold text-sm mt-1'>Tanggal Lahir: 12 Desember 1977</p>
            <p className='font-bold text-sm mt-1'>Jenis Personel: Juru</p>
            <p className='font-bold text-sm mt-1'>Jenis Alat: -</p>
            <p className='font-bold text-sm mt-1'>Klasifikasi: Ahli K3 Bidang Konstruksi dan Bangunan</p>
            <p className='font-bold text-sm mt-1'>Kelas: Kelas I</p>
            <p className='font-bold text-sm mt-1'>No. Registrasi: 0000000001</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className='mt-2'>
        <div className='bg-[#15406A] w-full p-2 sm:p-10'>
          <div className='sm:px-20 px-0 sm:flex sm:items-center sm:justify-center'>
            <img alt='support' src='https://temank3.kemnaker.go.id/public/themes/website/asset/img/logofooter1.png' className='w-full h-100 sm:w-[900px]' />
          </div>
          <p className='text-white text-center'>Jl. Jenderal Gatot Subroto Kav.51, Daerah Khusus Ibukota Jakarta, 12750, Indonesia</p>
        </div>
        <div className='bg-black w-full p-5'>
          <p className='text-white text-center font-semibold'>Copyright GG &copy; 2020-2023 Ditjen Binwasnaker & K3, Kemnaker R.I.</p>
        </div>
        <div className='bg-white w-full p-7'>

        </div>
      </div>
    </div>
  )
}
