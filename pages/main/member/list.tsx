import Button from '@/components/Button'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import useModal, { Modal } from '@/components/Modal'
import Input from '@/components/Input'
import { getData } from '@/pages/api/member'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase/config'

export async function getServerSideProps(context: any) {
    try {
        let datas = collection(db, "members")
        const members = await getDocs(datas)
        return {
            props: {
                table: members.docs.map((doc: any) => doc.data()) || []
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function list({ table }: { table: any }) {
    const [info, setInfo] = useState<any>({ loading: false, message: "" })
    const [modal, setModal] = useModal<any>()
    const router = useRouter();
    const columns: any = [
        {
            name: "Nama",
            right: false,
            selector: (row: any) => row?.name
        },
        {
            name: "No Registrasi",
            right: false,
            selector: (row: any) => row?.regis_no
        },
        {
            name: "Tempat, Tanggal Lahir",
            right: false,
            selector: (row: any) => row?.birth_place + ", " + row?.birth_date
        },
        {
            name: "Jenis Alat",
            right: false,
            selector: (row: any) => row?.name
        },
        {
            name: "Jenis Personel",
            right: false,
            selector: (row: any) => row?.name
        },
        {
            name: "Klasifikasi",
            right: false,
            selector: (row: any) => row?.name
        },
        {
            name: "Kelas",
            right: false,
            selector: (row: any) => row?.name
        },
        {
            name: "Foto",
            right: false,
            selector: (row: any) => row?.photo ? <img alt='image-profil' src={row?.photo} className='w-[70px] h-[100px]' /> : "-"
        },
        {
            name: "Aksi",
            right: false,
            selector: (row: any) => <>
                <button className='text-green-500'>Edit</button><br/>
                <button className='text-red-500'>Hapus</button>
            </>
        }
    ]
    return (
        <Layout>
            <div className='p-2'>
                <h1 className='text-2xl font-semibold '>Data Personel</h1>
                <Button type='button' onClick={() => {
                    router.push('create')
                }}>Tambah Data</Button>
                <div>
                    <DataTable
                        columns={columns}
                        data={table}
                        pagination={true}
                        paginationServer={true}
                        paginationDefaultPage={1}
                        striped={true}
                        responsive={true}
                        highlightOnHover
                        pointerOnHover
                    />
                </div>
                {/* {
                    modal.key == "create" ?
                        <>
                            <Modal
                                open={modal.open}
                                setOpen={() => setModal({ ...modal, open: false })}

                            >
                                <div>
                                    <h1 className='text-center font-bold text-lg'>{modal.key == "create" ? "Tambah Data Admin" : "Ubah Data Admin"}</h1>
                                    <form onSubmit={handleCreate}>
                                        <Input label='Email' placeholder='Masukkan Email' name='email' />
                                        <Input label='Password' type='password' placeholder='********' name='password' />
                                        <div className='my-4'>
                                            <Button type='submit'>Simpan</Button>
                                            <Button type='button' color='white' onClick={() => { setModal({ ...modal, open: false }) }} >Tutup</Button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </> : ""
                } */}
            </div>
        </Layout>
    )
}
