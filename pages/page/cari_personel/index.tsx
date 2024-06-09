import { RxHamburgerMenu } from 'react-icons/rx'
import { FaHome, FaFlag, FaBook, FaUser } from 'react-icons/fa'
import { useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/config'
import Input from '@/components/Input'
import Button from '@/components/Button'
import axios from 'axios'

export async function getServerSideProps(context: any) {
    try {

        return {
            props: {
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function Qrcode({ detail }: { detail: any }) {
    const [open, setOpen] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const months = [
        { value: 1, label: 'Januari' },
        { value: 2, label: 'Februari' },
        { value: 3, label: 'Maret' },
        { value: 4, label: 'April' },
        { value: 5, label: 'Mei' },
        { value: 6, label: 'Juni' },
        { value: 7, label: 'Juli' },
        { value: 8, label: 'Agustus' },
        { value: 9, label: 'September' },
        { value: 10, label: 'Oktober' },
        { value: 11, label: 'November' },
        { value: 12, label: 'Desember' },
    ]
    const [member, setMember] = useState<any>([])
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            setSubmitted(true)
            const payload = {
                name: e.target.name.value,
                birth_date: e.target.birth_date.value
            }
            const result = await axios.get(`https://api-temank3.vercel.app/members?pagination=true&birth_date=${payload?.birth_date}&search=${payload?.name}`, {
                headers: {
                    'bearer-token': 'temank3ku'
                }
            })
            setMember(result.data.items.rows)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
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
            <div className='flex justify-end absolute'>
                <div className='border-t-[#15406A] border-r-[240px] border-r-transparent border-t-[100px]'>

                </div>
            </div>
            <div className={`sm:px-20 px-4 p-4 ${open ? "pt-24" : ""} `}>
                {
                    submitted ?
                        <>
                            <h1 className='text-[26px] text-[#5a5a5a] text-center font-semibold'>Hasil Pencarian Personel</h1>
                            <div className='border-4 sm:border-[7px] sm:rounded-xl border-[#15406A] rounded-lg bg-white mt-2'>
                                <div className='bg-[#15406A] w-full p-1 mt-5'>
                                    <h1 className='text-center font-semibold text-xl text-white'>BIODATA PERSONEL</h1>
                                </div>
                                {
                                    loading ?
                                        <div>
                                            <p className='text-center text-xl' >Menunggu...</p>
                                        </div> :
                                        <>
                                            {
                                                member?.length > 0 ?
                                                    <div className='overflow-x-auto max-w-xl sm:max-w-none mt-5'>
                                                        <table className='w-full'>
                                                            <thead className='border'>
                                                                <tr className='border'>
                                                                    <th>No</th>
                                                                    <th>Nama</th>
                                                                    <th>Tempat & Tanggal Lahir</th>
                                                                    <th>Nama Instansi</th>
                                                                    <th>Jenis Personil</th>
                                                                    <th>Jenis Alat</th>
                                                                    <th>Klasifikasi</th>
                                                                    <th>Kelas</th>
                                                                    <th>No. Registrasi</th>
                                                                    <th>Masa Berlaku</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    member?.map((v: any, i: number) => (
                                                                        <tr>
                                                                            <td>{i + 1}</td>
                                                                            <td>{v?.name}</td>
                                                                            <td>{v?.birth_place}, {
                                                                                (new Date(v?.birth_date)?.getDate() < 10 ? (("0" + new Date(v?.birth_date)?.getDate())) : new Date(v?.birth_date)?.getDate()) + " " + months?.find((val: any) => val.value == (new Date(v?.birth_date)?.getMonth() + 1))?.label + " " + new Date(v?.birth_date)?.getFullYear()
                                                                            }</td>
                                                                            <td>{v?.instance || "-"}</td>
                                                                            <td>{v?.personel_type}</td>
                                                                            <td>{v?.tool_type}</td>
                                                                            <td>{v?.clasification || "-"}</td>
                                                                            <td>{v?.class || "-"}</td>
                                                                            <td>{v?.regis_no || "-"}</td>
                                                                            <td>{(new Date(v?.expired_at)?.getDate() < 10 ? (("0" + new Date(v?.expired_at)?.getDate())) : new Date(v?.expired_at)?.getDate()) + " " + months?.find((val: any) => val.value == (new Date(v?.expired_at)?.getMonth() + 1))?.label + " " + new Date(v?.expired_at)?.getFullYear()}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    :
                                                    <div className='p-2'>
                                                        <div className='bg-red-200 p-2'>
                                                            <h1 className='text-[24px] text-red-800 text-center font-semibold'>Data yang anda cari tidak ditemukan, Harap menghubungi petugas TemanK3 melalui email : layanank3@kemnaker.go.id</h1>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                }
                                <div className='mt-5'>
                                    <div className='justify-center items-center flex sm:px-[600px] px-5 w-full mt-10'>
                                        <Button color='info' type='button' onClick={() => {
                                            window.open("https://temank3.kemnaker.go.id/page/subcariskp/")
                                        }}>Kembali</Button>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <>
                            <>
                                <div className='border-4 sm:border-[7px] sm:rounded-xl border-[#15406A] sm:mx-[400px] rounded-lg bg-white mt-2'>
                                    <div className='bg-[#15406A] w-full p-1 mt-5'>
                                        <h1 className='text-center font-semibold text-xl text-white'>Cari Personel</h1>
                                    </div>
                                    <div className='mt-5'>
                                        <form onSubmit={handleSubmit} className='text-center sm:px-20 px-0'>
                                            <Input types='special' label='Nama Peserta' name='name' />
                                            <Input types='special' label='Tanggal Lahir' type='date' name='birth_date' />
                                            <div className='justify-center items-center flex sm:px-[100px] px-36 mt-10'>
                                                <Button type='submit' color='info' >Submit</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                            <div className='justify-center items-center flex sm:px-[630px] px-0 mt-5'>
                                <Button color='info' type='button' onClick={() => {
                                    window.open("https://temank3.kemnaker.go.id/page/subcariskp/")
                                }} >Kembali</Button>
                            </div>
                        </>
                }
            </div>
            <div className='flex justify-end -mt-16 sm:-mt-0'>
                <div className='border-b-[#15406A] border-l-[240px] border-l-transparent border-b-[100px] sm:border-b-[#15406A] sm:border-l-[0px] sm:border-l-transparent sm:border-b-[0px]'>

                </div>
            </div>
            {/* Footer */}
            <div className='w-full'>
                <div className='bg-[#15406A] w-full p-2 sm:p-10'>
                    <div className='sm:px-20 px-0 sm:flex sm:items-center sm:justify-center'>
                        <img alt='support' src='https://temank3.kemnaker.go.id/public/themes/website/asset/img/logofooter1.png' className='w-full h-100 sm:w-[900px]' />
                    </div>
                    <p className='text-white text-center'>Jl. Jenderal Gatot Subroto Kav.51, Daerah Khusus Ibukota Jakarta, 12750, Indonesia</p>
                </div>
                <div className='bg-black w-full p-5'>
                    <p className='text-white text-center font-semibold'>Copyright GG &copy; 2020-2024 Ditjen Binwasnaker & K3, Kemnaker R.I.</p>
                </div>
            </div>
        </div>
    )
}
