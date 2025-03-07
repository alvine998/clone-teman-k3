import Button from '@/components/Button'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import useModal, { Modal } from '@/components/Modal'
import Input from '@/components/Input'
import addData, { updateData } from '@/pages/api/member'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, storage } from '@/firebase/config'
import Swal from 'sweetalert2'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import axios from 'axios'

export async function getServerSideProps(context: any) {
    try {
        const { code } = context.params
        const result = await axios.get(`https://temank3-api.asbinews.com/members?pagination=true&search=${code}`, {
            headers: {
                'bearer-token': 'temank3ku'
            }
        })
        return {
            props: {
                detail: result.data.items.rows || []
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function edit({ detail }: any) {
    const [info, setInfo] = useState<any>({ loading: false, message: "" })
    const [modal, setModal] = useModal<any>()
    const details = detail?.[0]
    const [imageData, setImageData] = useState<any>({
        preview: details?.photo || null,
        data: details?.photo || null,
        url: details?.photo || null
    })
    const router = useRouter();

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        const formData: any = Object.fromEntries(new FormData(e.target))
        try {
            const payload = {
                ...formData,
                photo: imageData?.url
            }
            const result = await axios.patch(`https://temank3-api.asbinews.com/member`, payload, {
                headers: {
                    'bearer-token': 'temank3ku'
                }
            })
            Swal.fire({
                text: "Berhasil menyimpan data",
                icon: "success"
            })
            router.push("/main/member/list")
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal menyimpan data",
                icon: "error"
            })
        }
    }
    return (
        <Layout>
            <div className='p-2'>
                <div>
                    <h1 className='text-center font-bold text-lg'>{router.pathname?.includes("create") ? "Tambah Data Personel" : "Ubah Data Personel"}</h1>
                    <form onSubmit={handleUpdate}>
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <div className='flex justify-center items-center'>
                                {
                                    imageData.url && <img alt='images' src={imageData.url} className='w-[150px] h-[200px]' />
                                }
                            </div>
                            <Input required={imageData?.data == null} label='Foto' placeholder='Masukkan Foto' defaultValue={imageData?.data} name='photo' type='file' accept='image/*' onChange={(e: any) => {
                                const preview = e.target.files[0]
                                const fileName = preview?.name
                                const storageRef = ref(storage, `/files/${fileName}`);
                                uploadBytes(storageRef, preview)
                                    .then(async (snapshot) => {
                                        console.log('Image uploaded successfully!');
                                        const url = await getDownloadURL(storageRef)
                                        setImageData({ url: url })
                                    })
                                    .catch((error) => {
                                        console.error('Error uploading image: ', error);
                                    });
                            }} />
                        </div>
                        <input type="text" className='hidden' value={details?.id} name='id' />
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <Input required defaultValue={details?.name} label='Nama' placeholder='Masukkan Nama' name='name' />
                            <Input required defaultValue={details?.regis_no} label='No Registrasi' placeholder='Masukkan No Registrasi' name='regis_no' />
                        </div>
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <Input required defaultValue={details?.birth_place} label='Tempat Lahir' placeholder='Masukkan Tempat Lahir' name='birth_place' />
                            <Input required defaultValue={details?.birth_date} label='Tanggal Lahir' type='date' placeholder='Masukkan Tanggal Lahir' name='birth_date' />
                        </div>
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <Input required defaultValue={details?.personel_type} label='Jenis Personel' placeholder='Masukkan Jenis Personel' name='personel_type' />
                            <Input defaultValue={details?.tool_type} label='Jenis Alat' required placeholder='Masukkan Jenis Alat' name='tool_type' />
                            <Input label='Nama Instansi' defaultValue={details?.instance} required placeholder='Masukkan Nama Instansi' name='instance' />
                        </div>
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <Input required defaultValue={details?.clasification} label='Klasifikasi' placeholder='Masukkan Klasifikasi' name='clasification' />
                            <Input required defaultValue={details?.class} label='Kelas' placeholder='Masukkan Kelas' name='class' />
                            <Input required defaultValue={details?.expired_at} label='Masa Berlaku' type='date' name='expired_at' />
                        </div>
                        <div className='sm:flex sm:gap-2 sm:justify-between my-4'>
                            <Button type='submit'>Simpan</Button>
                            <Button type='button' color='white' onClick={() => { router.push('/main/member/list') }} >Tutup</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
