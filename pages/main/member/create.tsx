import Button from '@/components/Button'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import useModal, { Modal } from '@/components/Modal'
import Input from '@/components/Input'
import addData from '@/pages/api/member'
import Swal from 'sweetalert2'
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage'
import { storage } from '@/firebase/config'
import axios from 'axios'
import { CONFIG } from '@/config'

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
        data: null,
        url: null
    })
    const router = useRouter();
    const columns: any = [
        {
            name: "Aksi",
            right: false,
            selector: (row: any) => <Button color='danger' >Hapus</Button>
        }
    ]

    function generateRandomString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    const handleCreate = async (e: any) => {
        e.preventDefault();
        const formData: any = Object.fromEntries(new FormData(e.target))
        try {

            const payload = {
                ...formData,
                photo: imageData.url,
                deleted: 0
            }
            const result = await axios.post(`${CONFIG.base_url_api}/member`, payload, {
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
                    <form onSubmit={handleCreate}>
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <div className='flex justify-center items-center'>
                                {
                                    imageData.url && <img alt='images' src={imageData.url} className='w-[150px] h-[200px]' />
                                }
                            </div>
                            <Input required label='Foto' placeholder='Masukkan Foto' name='photo' type='file' accept='image/*' onChange={async (e: any) => {
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
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <Input required label='Nama' placeholder='Masukkan Nama' name='name' />
                            <Input required label='No Registrasi' placeholder='Masukkan No Registrasi' name='regis_no' />
                        </div>
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <Input required label='Tempat Lahir' placeholder='Masukkan Tempat Lahir' name='birth_place' />
                            <Input required label='Tanggal Lahir' type='date' placeholder='Masukkan Tanggal Lahir' name='birth_date' />
                        </div>
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <Input required label='Jenis Personel' placeholder='Masukkan Jenis Personel' name='personel_type' />
                            <Input label='Jenis Alat' required placeholder='Masukkan Jenis Alat' name='tool_type' />
                            <Input label='Nama Instansi' required placeholder='Masukkan Nama Instansi' name='instance' />
                        </div>
                        <div className='sm:flex sm:gap-2 sm:justify-between'>
                            <Input required label='Klasifikasi' placeholder='Masukkan Klasifikasi' name='clasification' />
                            <Input required label='Kelas' placeholder='Masukkan Kelas' name='class' />
                            <Input required label='Masa Berlaku' type='date' name='expired_at' />
                        </div>

                        <div className='my-4 sm:flex sm:gap-2 sm:justify-end'>
                            <Button type='submit'>Simpan</Button>
                            <Button type='button' color='white' onClick={() => { router.push('/main/member/list') }} >Tutup</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
