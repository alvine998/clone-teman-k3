import Button from '@/components/Button'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import useModal, { Modal } from '@/components/Modal'
import Input from '@/components/Input'
import { getData, updateData } from '@/pages/api/member'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase/config'

export async function getServerSideProps(context: any) {
    try {
        let datas = collection(db, "members")
        let q = query(datas, where('deleted', "!=", 1))
        const members = await getDocs(q)
        return {
            props: {
                table: members.docs.map((doc: any) => { return { ...doc.data(), id: doc.id } }) || []
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
            selector: (row: any) => row?.tool_type
        },
        {
            name: "Jenis Personel",
            right: false,
            selector: (row: any) => row?.personel_type
        },
        {
            name: "Klasifikasi",
            right: false,
            selector: (row: any) => row?.clasification
        },
        {
            name: "Kelas",
            right: false,
            selector: (row: any) => row?.class
        },
        {
            name: "Masa Berlaku",
            right: false,
            selector: (row: any) => row?.expired_at || "-"
        },
        {
            name: "Foto",
            right: false,
            selector: (row: any) => row?.photo ? <img alt='image-profil' src={row?.photo} className='w-[70px] h-[100px]' /> : "-"
        },
        {
            name: "Status",
            right: false,
            selector: (row: any) => row?.expired_at > new Date().toISOString() ? "Aktif" : "Tidak Aktif"
        },
        {
            name: "Aksi",
            right: false,
            selector: (row: any) => <>
                <a href={`/page/cek_qrcode/${row?.regis_no}`} className='text-blue-500'>Lihat</a><br />
                <a href={`/main/member/edit/${row?.regis_no}`} className='text-green-500'>Edit</a><br />
                <button type='button' onClick={() => {
                    setModal({ ...modal, open: true, data: row, key: "delete" })
                }} className='text-red-500'>Hapus</button>
            </>
        }
    ]
    const handleDelete = async (e: any) => {
        e.preventDefault();
        const formData: any = Object.fromEntries(new FormData(e.target))
        try {
            const payload = {
                ...formData,
                deleted: 1
            }
            await updateData('members', modal?.data?.id, payload)
            setModal({ ...modal, open: false })
            router.push("/main/member/list")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className='p-2'>
                <div className='sm:pl-20'>
                    <h1 className='text-2xl font-semibold '>Data Personel</h1>
                </div>
                <div className='sm:flex sm:w-1/4 sm:items-start sm:pl-20 pl-0'>
                    <Button type='button' onClick={() => {
                        router.push('create')
                    }}>Tambah Data</Button>
                </div>
                <div className='sm:px-20 px-0'>
                    <DataTable
                        columns={columns}
                        data={table}
                        striped={true}
                        responsive={true}
                        highlightOnHover
                        pointerOnHover
                    />
                </div>
                {
                    modal.key == "delete" ?
                        <>
                            <Modal
                                open={modal.open}
                                setOpen={() => setModal({ ...modal, open: false })}

                            >
                                <div>
                                    <h1 className='text-center font-bold text-lg'>Hapus Data Personel</h1>
                                    <form onSubmit={handleDelete}>
                                        <p className='text-center'>Apakah anda yakin ingin menghapus personel {modal?.data?.name}?</p>
                                        <div className='my-4'>
                                            <Button type='submit' color='danger'>Hapus</Button>
                                            <Button type='button' color='white' onClick={() => { setModal({ ...modal, open: false }) }} >Tutup</Button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </> : ""
                }
            </div>
        </Layout>
    )
}
