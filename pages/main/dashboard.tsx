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

        return {
            props: {
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function list({ table }: { table: any }) {
    const [info, setInfo] = useState<any>({ loading: false, message: "" })
    const [modal, setModal] = useModal<any>()
    return (
        <Layout>
            <div className='p-2'>
                <div className='bg-green-200 w-full p-10'>
                    <h1 className='text-lg text-green-800'>Selamat Datang di Dashboard Admin Teman K3</h1>
                </div>
            </div>
        </Layout>
    )
}
