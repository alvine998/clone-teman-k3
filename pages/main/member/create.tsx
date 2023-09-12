import Button from '@/components/Button'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import useModal, { Modal } from '@/components/Modal'
import Input from '@/components/Input'
import addData from '@/pages/api/member'

export async function getServerSideProps(context: any) {
    try {
        // const result = await firebase
        return {
            props: {
                table: []
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function list() {
    const [info, setInfo] = useState<any>({ loading: false, message: "" })
    const [modal, setModal] = useModal<any>()
    const [imageData, setImageData] = useState<any>({
        preview: null,
        data: null
    })
    const router = useRouter();
    const columns: any = [
        {
            name: "Aksi",
            right: false,
            selector: (row: any) => <Button color='danger' >Hapus</Button>
        }
    ]

    const handleCreate = async (e: any) => {
        e.preventDefault();
        const formData: any = Object.fromEntries(new FormData(e.target))
        try {
            const payload = {
                ...formData,
                photo: imageData?.data
            }
            await addData('members', 'mmber', payload)
            router.push("/main/member/list")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className='p-2'>
                <div>
                    <h1 className='text-center font-bold text-lg'>{router.pathname?.includes("create") ? "Tambah Data Personel" : "Ubah Data Personel"}</h1>
                    <form onSubmit={handleCreate}>
                        <div className='flex justify-center items-center'>
                            {
                                imageData.preview && <img alt='images' src={imageData.preview} className='w-[150px] h-[200px]' />
                            }
                        </div>
                        <Input label='Foto' placeholder='Masukkan Foto' name='photo' type='file' accept='image/*' onChange={(e: any) => {
                            const preview = e.target.files[0]
                            const reader = new FileReader()
                            if (preview) {
                                reader.onload = (el) => {
                                    setImageData({ preview: el.target?.result, data: reader.result })
                                }
                            }
                            reader.readAsDataURL(preview)
                        }} />
                        <Input label='Nama' placeholder='Masukkan Nama' name='name' />
                        <Input label='No Registrasi' placeholder='Masukkan No Registrasi' name='regis_no' />
                        <Input label='Tempat Lahir' placeholder='Masukkan Tempat Lahir' name='birth_place' />
                        <Input label='Tanggal Lahir' type='date' placeholder='Masukkan Tanggal Lahir' name='birth_date' />
                        <Input label='Jenis Personel' placeholder='Masukkan Jenis Personel' name='personel_type' />
                        <Input label='Jenis Alat' placeholder='Masukkan Jenis Alat' name='tool_type' />
                        <Input label='Klasifikasi' placeholder='Masukkan Klasifikasi' name='clasification' />
                        <Input label='Kelas' placeholder='Masukkan Kelas' name='class' />
                        <div className='my-4'>
                            <Button type='submit'>Simpan</Button>
                            <Button type='button' color='white' onClick={() => { setModal({ ...modal, open: false }) }} >Tutup</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
