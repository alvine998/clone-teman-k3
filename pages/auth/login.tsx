import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useState } from 'react'
import { login } from '../api/member'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function Login() {
    const [info, setInfo] = useState<any>({ loading: false, message: "", type: null })
    const router = useRouter()

    const handleLogin = async (e: any) => {
        try {
            e.preventDefault();
            const formData: any = Object.fromEntries(new FormData(e.target))
            const result = await login(formData?.email, formData?.password)
            if (result.result?.user) {
                Swal.fire({
                    text: "Login Berhasil",
                    icon: "success"
                })
                localStorage.setItem("uid", result.result?.user?.uid)
                router.push("/main/dashboard")
            } else {
                Swal.fire({
                    text: "Email atau Password Salah!",
                    icon: "warning"
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Login Gagal",
                icon: "error"
            })
        }
    }
    return (
        <div className='flex flex-col py-20 px-10'>
            <h1 className='text-2xl font-semibold text-center'>ADMIN TEMAN K3</h1>
            <form onSubmit={handleLogin} className='mt-5 sm:px-[500px]'>
                <Input label='Email' required placeholder='Masukkan Email' type='email' name='email' />
                <Input label='Password' required placeholder='********' type='password' name='password' />
                <div className='mt-5'>
                    <Button>Masuk</Button>
                </div>
            </form>
        </div>
    )
}
