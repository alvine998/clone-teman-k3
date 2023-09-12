import Button from '@/components/Button'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import useModal, { Modal } from '@/components/Modal'
import Input from '@/components/Input'

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
    const router = useRouter();
    const columns: any = [
        {
            name: "",
            right: false,
            selector: (row: any) => row?.name
        }
    ]

    // const handleCreate = async (e: any) => {
    //     e.preventDefault();
    //     const formData: any = Object.fromEntries(new FormData(e.target))
    //     try {
    //         const result = await createUserWithEmailAndPassword(auth, formData?.email, formData?.password)
    //         console.log(result);
    //         router.push("/main/user/list")
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return (
        <Layout>
            <div className='p-2'>
                <Button type='button' onClick={() => {
                    setModal({ ...modal, open: true, key: "create", data: null })
                }}>Tambah Data</Button>
                <div>
                    <DataTable
                        columns={columns}
                        data={[]}
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
